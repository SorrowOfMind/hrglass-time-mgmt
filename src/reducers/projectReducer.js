import {CREATE_PROJECT, CREATE_PROJECT_ERROR, DELETE_PROJECT, DELETE_PROJECT_ERROR, SUM_UP_TIME, SUM_UP_TIME_ERROR} from '../actions/types';

const initialState = {
    title: '',
    deadline: '',
    dscr: '',
    createdAt: '',
    tasks: []
}

const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_PROJECT:
            console.log('project created in firebase');
            return state;
        case CREATE_PROJECT_ERROR:
            console.log('project error', action.payload);
            return state;
        case DELETE_PROJECT:
            console.log('project deleted');
            return state;
        case DELETE_PROJECT_ERROR:
            console.log('projectd deletion error');
            return state;
        case SUM_UP_TIME:
            console.log('total time calculated');
            return state;
        case SUM_UP_TIME_ERROR:
            console.log('total time error');
            return state;
        default:
            return state;
    }
}

export default projectReducer;