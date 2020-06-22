import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { deleteProject } from '../../actions/projectAction';

const ProjectSummary = ({project}) => {
    const projectId = project.id;
    const dispatch = useDispatch();
    const totalTimeWorked = useSelector(state => state.firestore.data.projects[projectId].formattedTotalTime);

    const projectDeletion = e => {
        e.preventDefault();
        dispatch(deleteProject(projectId));
    };

    return (
        <div className="project">
            <div className="project__summary">
                <div className="project__header">
                    <h3 className="project__title">{project.title}</h3>
                    <span className="project__delete"><FontAwesomeIcon icon={faTrashAlt} className="fa-delete" onClick={projectDeletion}/></span>
                    <p className="project__timestamp">Created: {moment(project.createdAt.toDate()).calendar()}</p>
                    {project.deadline && <p className="project__deadline">Deadline: {project.deadline}</p>}
                </div>
                <div className="project__time">Time spent: {totalTimeWorked}</div>
                <div className="project__mark">Let's work!</div>
            </div>
        </div>
    )
}

export default ProjectSummary;
