import {ADD_CLIENT, ADD_CLIENT_ERROR, DELETE_CLIENT, DELETE_CLIENT_ERROR} from './types';
import firebase from '../firebase/config';

export const createClient = (client) => {
    return (dispatch, getState) => {
        const userId = getState().firebase.auth.uid;
        let newClient = {
            name: client,
            owner: userId
        }
        firebase
            .firestore()
            .collection('clients')
            .add(newClient)
            .then(() => dispatch({type: ADD_CLIENT}))
            .catch(err => dispatch({type: ADD_CLIENT_ERROR, payload: err}))
    }
}

export const deleteClient = clientId => {
    return dispatch => {
        const clientRef = firebase.firestore().collection('clients').doc(clientId);
        clientRef.delete()
            .then(() => dispatch({type: DELETE_CLIENT}))
            .catch(err => dispatch({type: DELETE_CLIENT_ERROR, payload: err}))
    }
}