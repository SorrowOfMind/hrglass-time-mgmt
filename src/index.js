import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createFirestoreInstance, actionTypes} from 'redux-firestore';
import {ReactReduxFirebaseProvider} from 'react-redux-firebase';
import firebase from './firebase/config';

import './index.scss';

import App from './App';
import store from './store';

const rrfConfig = {
    useFirestoreForProfile: true,
    userProfile: 'users',
    onAuthStateChanged: (authData, firebase, dispatch) => {
        if (!authData) {
          dispatch({ type: actionTypes.CLEAR_DATA })
        }
    }
}

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance
}

ReactDOM.render(
    <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
        <App/>
    </ReactReduxFirebaseProvider>
    </Provider>, 
    document.getElementById('root'));
