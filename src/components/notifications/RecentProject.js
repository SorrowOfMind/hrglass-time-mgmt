import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from'moment';

const RecentProject = ({project, title}) => {
    return (
        <div className="last-created clearfix">
            <h3 className="last-created__title">{title}</h3>
            <div className="last-created__details">
                <p>{project.title}</p>
                <p>When: {moment(project.createdAt.toDate()).calendar()}</p>
                <p>Time: {project.formattedTotalTime}</p>
            </div>
            <Link to={`/workspace/projects/${project.id}`}>
                <button className="btn__resume">
                    <span>Resume</span>
                </button>
            </Link>
        </div>
    )
}

RecentProject.propTypes = {
    title: PropTypes.string.isRequired
}

export default RecentProject;
