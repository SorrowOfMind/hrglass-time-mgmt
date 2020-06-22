import {ADD_CLIENT, ADD_CLIENT_ERROR, DELETE_CLIENT, DELETE_CLIENT_ERROR} from '../actions/types';

const initialState = {}

const clientReducer = (state=initialState, action) => {
    switch(action.type) {
        case ADD_CLIENT:
            console.log('client added');
            return state;
        case ADD_CLIENT_ERROR:
            console.log('client error', action.payload.message);
            return state;
        case DELETE_CLIENT:
            console.log('client deleted');
            return state;
        case DELETE_CLIENT_ERROR:
            console.log('client deletion error', action.payload.message)
        default:
            return state;
    }
}

export default clientReducer;