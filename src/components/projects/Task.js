import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons';

const Task = ({task, removeTask, idx, resumeTask}) => {
    return (
        <div className="task-wrapper">
            <span className="task__title">{task.name}</span>
            <div className="task__controls">
                    <span className="task__time">{task.formattedTime}</span>
                <div className="task__icons">
                    <FontAwesomeIcon icon={faPlayCircle} className="fa fa-play" onClick={() => resumeTask(idx)}/>
                    <FontAwesomeIcon icon={faTrashAlt} className="fa-delete-task" onClick={() => removeTask(idx)}/>
                </div>
            </div>
        </div>
    )
}

Task.propTypes = {
    removeTask: PropTypes.func.isRequired,
    resumeTask: PropTypes.func.isRequired
}

export default Task;
