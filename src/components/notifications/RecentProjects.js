import React from 'react';

import RecentProject from './RecentProject';

const RecentProjects = ({projects}) => {
    return (
        <div className="activity-wrapper">
                {projects[0] && <RecentProject project={projects[0]} title='Last project you created' />}
                {projects[1] && <RecentProject project={projects[1]} title='Recent project' />}
                {projects[2] && <RecentProject project={projects[2]} title='Recent project' />}
        </div>
    )
}

export default RecentProjects;
