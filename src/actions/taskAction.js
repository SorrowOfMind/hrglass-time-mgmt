import {UPDATE_TASKS} from './types';
import firebase from '../firebase/config';

export const updateTasks = (projectId, tasksList) => {
    return dispatch => {
        const projectRef = firebase.firestore().collection('projects').doc(projectId);
        projectRef.update({
            tasks: tasksList
        })
        .then(() => dispatch({type: UPDATE_TASKS}));
    }
}