import React from 'react';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';

import RecentProjects from '../notifications/RecentProjects';
import RecentTasks from '../notifications/RecentTasks';
import Notifications from '../notifications/Notifications';
import Bubbles from './Bubbles';
import Loader from './Loader';

const Dashboard = () => {
    const auth = useSelector(state => state.firebase.auth);
    const projects = useSelector(state => state.firestore.ordered.projects);
    const notifications = useSelector(state => state.firestore.ordered.notifications);

    useFirestoreConnect([
        {
            collection: "projects",
            where: ['author', '==', auth.uid],
            orderBy: ['createdAt', 'desc']
        }, 
        {
            collection: "notifications",
            where: ['user', '==', auth.uid],
            limit: 5,
            orderBy: ['time', 'desc']
        }
    ]);
  
    return (
        <div>
            {(!projects || !notifications) && <Loader />}
            <header className="header dashboard__header">
                <h1 className="dashboard__title section__title">Dashboard</h1>
            </header>
            <div className="dashboard__activity">
                <div className="activity dashboard__col">
                    <h2 className="dashboard__subtitle">Recent Projects</h2>
                    {projects && projects.length === 0
                        ? <Bubbles/>
                        : projects
                            ? <RecentProjects projects={projects}/>
                            : null}
                </div>
                <div className="tasks dashboard__col">
                    <h2 className="dashboard__subtitle">Recent tasks</h2>
                    {projects && (projects.length === 0 || projects.every(project => project.tasks.length === 0))
                        ? <Bubbles/>
                        : projects
                            ? <RecentTasks projects={projects}/>
                            : null}
                </div>
                <div className="notifications dashboard__col">
                    <h2 className="dashboard__subtitle">Notifications</h2>
                    {notifications && notifications.length === 0
                        ? <Bubbles/>
                        : notifications
                            ? <Notifications notifications={notifications}/>
                            : null}
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
