import {SIGNUP_SUCCESS, SIGNUP_ERROR, LOG_OUT, LOGIN_SUCCESS, LOGIN_ERROR, RESET_PASSWORD, RESET_PASSWORD_ERROR} from './types';
import firebase from '../firebase/config';

export const signUp = ({username, email, password}) => async (dispatch) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(response => firebase.firestore().collection('users').doc(response.user.uid).set({
            username: username,
            initials: `${username[0].toUpperCase()}${username[1]}`
        }))
        .then(() => dispatch({type: SIGNUP_SUCCESS}))
        .catch((err) => dispatch({type: SIGNUP_ERROR, payload: err}));
}

export const logOut = async (dispatch) => {
    firebase.auth().signOut().then(() => dispatch({type: LOG_OUT}));
}

export const logIn = ({email, password}) => async (dispatch) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => dispatch({type: LOGIN_SUCCESS}))
            .catch((err) => dispatch({type: LOGIN_ERROR, payload: err}));
}

export const resetPassword = email => {
    return dispatch => {
        firebase.auth().sendPasswordResetEmail(email)
            .then(() => dispatch({type: RESET_PASSWORD}))
            .catch(err => dispatch({type: RESET_PASSWORD, payload: err}))
    }
}
