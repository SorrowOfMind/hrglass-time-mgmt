import React, { Component } from 'react';
import SideNav from '../navigation/SideNav';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar } from '@fortawesome/free-regular-svg-icons';
import { faListAlt } from '@fortawesome/free-regular-svg-icons';
import { faTasks } from '@fortawesome/free-solid-svg-icons';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';

import Projects from '../projects/Projects';
import Clients from '../manage/Clients';
import Tags from '../manage/Tags';
import Reports from '../raports/Raports';
import Dashboard from '../layout/Dashboard';
import ProjectDetails from '../projects/ProjectDetails';

const urls = [
    {
        name: 'Dashboard',
        id: 'dashboard',
        component: () => <Dashboard />,
        fa: () => <FontAwesomeIcon icon={faListAlt} className="fa-link"/>,
        dataTip : 'Dashboard'
    },
    {
        name: 'Projects',
        id: 'projects',
        component: () => <Projects />,
        fa: () => <FontAwesomeIcon icon={faTasks} className="fa-link"/>,
        dataTip : 'Projects'
    },
    {
        name: 'Project Details',
        id: 'projects/:projectId',
        component: () => <ProjectDetails />,
        fa: () => null,
        dataTip : null
    },
    {
        name: 'Clients',
        id: 'clients',
        component: () => <Clients />,
        fa: () => <FontAwesomeIcon icon={faUserTie} className="fa-link"/>,
        dataTip : 'Clients'
    },
    {
        name: 'Tags',
        id: 'tags',
        component: () => <Tags />,
        fa: () => <FontAwesomeIcon icon={faTag} className="fa-link"/>,
        dataTip : 'Tags'
    },
    {
        name: 'Reports',
        id: 'reports',
        component: () => <Reports />,
        fa: () => <FontAwesomeIcon icon={faChartBar} className="fa-link"/>,
        dataTip : 'Reports'
    }
];

export class Workspace extends Component {
    render() {
        const {match} = this.props;
     
        return (
            <div className="workspace">
                <SideNav match={match} urls={urls} />
                <div className="workspace__space">
                    <Switch>
                    {urls.map(({component, id}) => (
                        <Route exact path={`${match.path}/${id}`} key={id} component={component} />
                    ))}
                    </Switch>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(Workspace);
