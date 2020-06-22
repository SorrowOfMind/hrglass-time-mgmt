import {CREATE_PROJECT, CREATE_PROJECT_ERROR, DELETE_PROJECT, DELETE_PROJECT_ERROR, SUM_UP_TIME, SUM_UP_TIME_ERROR} from './types';
import firebase from '../firebase/config';

export const createProject = project => {
    return async(dispatch, getState) => {
        const userId = getState().firebase.auth.uid;

        let newProject = {
            ...project,
            author: userId,
            tasks: [],
            createdAt: new Date(),
        }

        firebase.firestore()
            .collection('projects')
            .add(newProject)
            .then(() => dispatch({type: CREATE_PROJECT}))
            .catch(err => dispatch({type: CREATE_PROJECT_ERROR, payload: err}))

    }
}

export const deleteProject = projectId => {
    return async dispatch => {
        const projectRef = firebase.firestore().collection('projects').doc(projectId);
        projectRef
            .delete()
            .then(() => dispatch({type: DELETE_PROJECT}))
            .catch(err => dispatch({type: DELETE_PROJECT_ERROR, payload: err}))
    }
}

export const sumUpTime = (projectId, {total, formattedTotal}) => {
    return async dispatch => {
        const projectRef = firebase.firestore().collection('projects').doc(projectId);
        projectRef
            .update({
                totalTime: total,
                formattedTotalTime: formattedTotal,
            })
            .then(() => dispatch({type: SUM_UP_TIME}))
            .catch(err => dispatch({type: SUM_UP_TIME_ERROR, payload: err}));
    }
}
