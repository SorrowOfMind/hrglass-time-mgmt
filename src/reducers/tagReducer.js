import {ADD_TAG, ADD_TAG_ERROR} from '../actions/types';

const initialState = {}

const tagReducer = (state=initialState, action) => {
    switch(action.type) {
        case ADD_TAG:
            console.log('tag added');
            return state;
        case ADD_TAG_ERROR:
            console.log('tag error', action.payload);
            return state;
        default:
            return state;
    }
}

export default tagReducer;