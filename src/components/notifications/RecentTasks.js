import React, {useState, useEffect} from 'react';

import RecentTask from './RecentTask';

const RecentTasks = ({projects}) => {
    const [sortedByTasks, setSortedByTasks] = useState(projects);

    const sortTasks = (arr) => {
        let sortedArr = arr
                            .filter(project => project.tasks.length !== 0)
                            .reduce((acc,val) => acc.concat(...val.tasks), [])
                            .sort((x,y) => y.createdAt.seconds - x.createdAt.seconds); 
        return sortedArr;
    }

    useEffect(() => {
        setSortedByTasks(sortTasks(projects));
    }, [projects]);

    return (
        <div className="activity-wrapper">
            {sortedByTasks[0] && <RecentTask task={sortedByTasks[0]} title='Last task you worked on' />}
            {sortedByTasks[1] && <RecentTask task={sortedByTasks[1]} title='Recent task you worked on' />}
            {sortedByTasks[2] && <RecentTask task={sortedByTasks[2]} title='Recent task you worked on' />}
        </div>
    )
}

export default RecentTasks;
