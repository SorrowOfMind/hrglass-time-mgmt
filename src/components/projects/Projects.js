import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ProjectSummary from './ProjectSummary';
import NewProjectModal from './NewProjectModal';
import Header from '../layout/Header';
import Loader from '../layout/Loader';

class Projects extends Component {
    state ={
        modal: false,
        query: '',
        filteredProjects: []
    }

    filterProjects = () => {
            let currentList = [...this.props.projects];
            let filteredList = currentList.filter(project => project.title.toLowerCase().indexOf(this.state.query.toLowerCase()) !== -1);
            this.setState({filteredProjects: filteredList})
    }

    showModal = () => {
        this.setState({modal: true})
    }

    hideModal = () => {
        this.setState({modal: false})
    }

    handleChange = e => {
        this.setState({query: e.target.value}, () => this.filterProjects())
    }
    
    render() {
        const {projects, clients, tags} = this.props;
        const {modal, query, filteredProjects} = this.state;
        return (
            <>
            {(!projects || !clients || !tags) && <Loader />}
            <NewProjectModal modal={modal} showModal={this.showModal} hideModal={this.hideModal} clients={clients} tags={tags}/>
                <Header title="Projects" query={query} handleChange={this.handleChange} placeholder="Find project..."/>
            <div className="section projects__list">
                <div className="projects-grid">
                        <div className="project" onClick={this.showModal}>
                            <div className="project__new">
                                <FontAwesomeIcon icon={faPlus} className="project__icon"/>
                                <p className="project__title_new">New Project</p>
                            </div>
                        </div>
                    {projects && !query ? 
                    projects.map(project => <Link to={`/workspace/projects/${project.id}`} key={project.id}><ProjectSummary project={project}/></Link>) :
                    query ?
                    filteredProjects.map(project => <Link to={`/workspace/projects/${project.id}`} key={project.id}><ProjectSummary project={project}/></Link>) :
                    null}
                </div>
            </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        projects: state.firestore.ordered.projects,
        clients: state.firestore.ordered.clients,
        tags: state.firestore.ordered.tags,
        auth: state.firebase.auth
    }
}

export default compose(connect(mapStateToProps), firestoreConnect(props => {
    return [
        {
            collection: "projects",
            where: ['author', '==', props.auth.uid],
            orderBy: ['createdAt', 'desc'],
        },
        {
            collection: "clients",
            where: ['owner', '==', props.auth.uid],
            orderBy: ['name'],
        },
        {
            collection: "tags",
            where: ['owner', '==', props.auth.uid],
            orderBy: ['name'],
        }
    ];
}),)(Projects);
