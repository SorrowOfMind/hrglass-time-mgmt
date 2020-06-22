import {UPDATE_TASKS} from '../actions/types';

const initialState = {
    name: '',
    time: 0,
    formattedTime: '00:00:00'
}

const taskReducer = (state=initialState, action) => {
    switch(action.type) {
        case UPDATE_TASKS:
            console.log('tasks updated');
            return state;
        default:
            return state;
    }
}

export default taskReducer;