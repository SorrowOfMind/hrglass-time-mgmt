import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';

import Header from '../layout/Header';
import Loader from '../layout/Loader';
import Chart from './Chart';
import PieChart from './PieChart';

const Reports = () => {
    const auth = useSelector(state => state.firebase.auth);
    const projects = useSelector(state => state.firestore.ordered.projects);

    const [times, setTimes] = useState([]);
    const [dates, setDates] = useState([]);
    const [taskTimes, setTaskTimes] = useState([]);
    const [taskNames, setTaskNames] = useState([]);
    const [query, setQuery] = useState('');
    const [index, setIndex] = useState(0);
    
    useFirestoreConnect([
        {
            collection: "projects",
            where: ['author', '==', auth.uid],
            orderBy: ['createdAt', 'desc'],
        },
    ]);

    const formatDate = (secs) => {
        let d = new Date(null);
        d.setSeconds(secs);
        let formattedTime = d
            .toISOString()
            .substr(0, 10);
        return formattedTime;
    }

    const formatTime = (secs) => {
      if (secs <= 60) {
        return `${secs}s`
      }
      if (secs > 60 && secs < 3600) {
        let min = Math.floor(secs/60);
        let sec = secs % 60;
        return `${min}m ${sec}s`
      }
      if (secs >= 3600) {
        let hr = Math.floor(secs/3600);
        let min = Math.floor(secs % 3600);
        return `${hr}hr ${min}m`;
    }
    }

    const groupTasks = arr => {
        const remodeledArr = arr
          .reduce((acc,val) => acc.concat({createdAt: formatDate(val.createdAt.seconds), time: val.time}), [])
          .reduce((acc, obj) => {
            let key = obj.createdAt;
            if (!acc[key]) {
              acc[key] = []
            }
            acc[key].push(obj.time);
            return acc;
          }, {})
        
        const keys = Object.keys(remodeledArr);
        setDates(keys);

        const values = Object.values(remodeledArr);
        const accValues = values.map(val => val.reduce((acc,val) => acc += val, 0));
        setTimes(accValues);

        const taskTimesArr = arr.reduce((acc,val) => acc.concat(val.time), []);
        setTaskTimes(taskTimesArr);

        const namesArr = arr.reduce((acc, val) => acc.concat(val.name), []);
        setTaskNames(namesArr);
        
    }


    useEffect(() => {
        if (projects && projects.length !== 0) {
           groupTasks(projects[0].tasks)
        }
    }, [projects]);

    useEffect(() => {
      if (projects && projects.length !== 0) {
        if (query) {
          findProject(query);
        } else {
          groupTasks(projects[0].tasks);
          setIndex(0);
        }
      }
    }, [query]);

    useEffect(() => {
      if (projects && index) {
        groupTasks(projects[index].tasks)
      }
    }, [index])

    const findProject = qry => {
      let idx = projects.findIndex(project => project.title.toLowerCase().indexOf(qry.toLowerCase()) !== -1);
      if (idx !== -1) {
        setIndex(idx);
      } else {
        setIndex(0);
      };
    }

    const handleChange = e => {
        setQuery(e.target.value);
    };
    return (
        <>
            {!projects && <Loader />}
            <Header title="Reports" query={query} handleChange={handleChange} placeholder="Find project" />
        <div className="section">
            {projects && projects.length !== 0 ? 
            (<>
            <h1 className="chart__title">Project: {(query && index) ? projects[index].title : projects[0].title}</h1>
            {(dates.length !== 0 && times.length !== 0) && 
            (<div className="chart__section">
            <Chart times={times} dates={dates} formatTime={formatTime}/>
            <PieChart taskTimes={taskTimes} formatTime={formatTime} taskNames={taskNames}/>
            </div>)
            }
            </>) :
            null}
        </div>
        </>
    )
}

export default Reports;

