import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';

const RecentTask = ({task, title}) => {
    return (
        <div className="last-created clearfix">
        <h3 className="last-created__title">{title}</h3>
        <div className="last-created__details">
            <p>{task.name}</p>
            <p>When: {moment(task.createdAt.toDate()).calendar()}</p>
            <p>Time: {task.formattedTime}</p>
        </div>
        <Link to={`/workspace/projects/${task.project}`}>
            <button className="btn__resume">
                <span>Resume</span>
            </button>
        </Link>
    </div>
    )
}

RecentTask.propTypes = {
    task: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired
}

export default RecentTask;
