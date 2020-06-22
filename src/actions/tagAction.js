import {ADD_TAG, ADD_TAG_ERROR, DELETE_TAG, DELETE_TAG_ERROR} from './types';
import firebase from '../firebase/config';

export const createTag = tag => {
    return (dispatch, getState) => {
        const userId = getState().firebase.auth.uid;
        let newTag = {
            name: tag,
            owner: userId
        }
        firebase
            .firestore()
            .collection('tags')
            .add(newTag)
            .then(() => dispatch({type: ADD_TAG}))
            .catch(err => dispatch({type: ADD_TAG_ERROR, payload: err}))
    }
}

export const deleteTag = tagId => {
    return dispatch => {
        const tagRef = firebase.firestore().collection('tags').doc(tagId);
        tagRef.delete()
            .then(() => dispatch({type: DELETE_TAG}))
            .catch(err => dispatch({type: DELETE_TAG_ERROR, payload: err}))
    }
}