import {combineReducers} from 'redux';
import {firebaseReducer} from 'react-redux-firebase';
import {firestoreReducer} from 'redux-firestore';

import authReducer from './authReducer';
import projectReducer from './projectReducer';
import taskReducer from './taskReducer';
import clientReducer from './clientReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    project: projectReducer,
    task: taskReducer,
    client: clientReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer
});

export default rootReducer;