import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { faPenFancy } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { sumUpTime } from '../../actions/projectAction';
import { updateTasks } from '../../actions/taskAction';

import Task from './Task';
import Controls from './Controls';

let interval = null;

const ProjectDetails = (props) => {
    const id = props.match.params.projectId;
    const project = useSelector(state => state.firestore.data.projects[id]);
    const taskListDb = useSelector(state => state.firestore.data.projects[id].tasks);
    const totalTimeWorkedFormatted = useSelector(state => state.firestore.data.projects[id].formattedTotalTime);
    const totalTimeWorked = useSelector(state => state.firestore.data.projects[id].totalTime);
    const {title, deadline, dscr, client, tags} = project;
    const [task, setTask] = useState('');
    const [timer, setTimer] = useState({
        time: 0,
        formattedTime: "00:00:00",
        timerState: 'stopped',
    });
    const [totalTime, setTotalTime] = useState({
        total: totalTimeWorked,
        formattedTotal: totalTimeWorkedFormatted
    });
    const [taskList, setTaskList] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        setTaskList(taskListDb);
        return () => setTaskList([]);
    }, []);

    useEffect(() => {
        dispatch(updateTasks(id, taskList));
    }, [taskList])

    useEffect(() => {
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        dispatch(sumUpTime(id, totalTime));
    }, [totalTime])

    const handleChange = e => {
        const {value} = e.target;
        setTask(value);
    }

    const addTask = () => {
        let newTask = {
            project: id,
            createdAt: new Date(),
            name: task,
            time: timer.time,
            formattedTime: formatTime(timer.time)
        }
        setTaskList(prevTaskList => [...prevTaskList, newTask]);
        setTotalTime(prevTotalTime => {
            return {
                ...prevTotalTime,
                total: prevTotalTime.total + timer.time,
                formattedTotal: formatTime(prevTotalTime.total + timer.time) 
            }
        });
    }

    const removeTask = (taskId) => {
        setTaskList(prevTaskList => {
            return prevTaskList.filter((task,idx) => idx !== taskId)
        });
        setTotalTime(prevTotalTime => {
            return {
                ...prevTotalTime,
                total: prevTotalTime.total - taskList[taskId].time,
                formattedTotal: formatTime(prevTotalTime.total - taskList[taskId].time) 
            }
        });
    }

    const resumeTask = (taskId) => {
        const singleTask = taskList[taskId];
        setTask(singleTask.name);
        setTimer(prevTimer => {
            return {
                ...prevTimer,
                time: singleTask.time,
                formattedTime: singleTask.formattedTime
            }
        })
        removeTask(taskId);
    }

    const timeHandler = () => setTimer(prevTimer => {
        return {
            time: prevTimer.time + 1,
            formattedTime: formatTime(prevTimer.time +1),
            timerState: 'running'
        }
    })

    const startTimer = () => {
        if (task && (timer.timerState === 'stopped' || timer.timerState === 'paused')) {
            interval = setInterval(() => timeHandler(), 1000);
        }
    }

    const pauseTimer = () => {
        if (timer.timerState === 'running') {
            clearInterval(interval);
            setTimer(prevTimer => {
                return {
                    ...prevTimer,
                    time: prevTimer.time,
                    timerState: 'paused'
                } 
            });
        }
    }

    const stopTimer = async () => {
        clearInterval(interval);
        if (task && timer.time) {
            addTask();
            setTimer({time: 0, formattedTime: "00:00:00", timerState: 'stopped'});
            setTask('');
        }
    }

    const formatTime = (sec) => {
        let date = new Date(null);
        date.setSeconds(sec);
        let formattedTime = date
            .toISOString()
            .substr(11, 8);
        return formattedTime;
    }

   

    return (
        <div className="detailed-wrapper">
            <div className="detailed">
                <div className="detailed__summary">
                    <h1 className="detailed__title">{title}</h1>
                    <p className="detailed__date">Created: {moment(project.createdAt.toDate()).calendar()}</p>
                        {deadline && <p className="detailed__deadline"><FontAwesomeIcon icon={faCalendarAlt} className="detailed__icon"/> {deadline}</p>}
                        {dscr && <p className="detailed__dscr"><FontAwesomeIcon icon={faPenFancy} className="detailed__icon"/> {dscr}</p>}
                        {client && <p className="detailed__client"><FontAwesomeIcon icon={faUser} className="detailed__icon"/> {client}</p>}
                        {tags.length !== 0 && <p className="detailed__tags"><FontAwesomeIcon icon={faTag} className="detailed__icon"/> {tags.join(', ')}</p>}
                    <p className="detailed__total">{totalTime.formattedTotal}</p>
                </div>
                <div className="detailed__add">
                    <form className="detailed__form" onSubmit={addTask}>
                        <input
                            type="text"
                            className="detailed__input"
                            placeholder="I'm working on..."
                            name="task"
                            value={task}
                            onChange={handleChange}/>
                        <div className="controls-wrapper">
                            <span className="timer">{timer.formattedTime}</span>
                            <Controls startTimer={startTimer} stopTimer={stopTimer} pauseTimer={pauseTimer} />
                        </div>
                    </form>
                </div>
                <div className="detailed__tasks">
                    {taskList.length !== 0 && taskList.map((task,idx) => <Task task={task} key={idx} idx={idx} removeTask={removeTask} resumeTask={resumeTask}/>)}
                </div>
            </div>
        </div>
    )
}


export default withRouter(ProjectDetails);
