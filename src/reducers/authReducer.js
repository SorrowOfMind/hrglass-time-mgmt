import {SIGNUP_SUCCESS, SIGNUP_ERROR, LOG_OUT, LOGIN_SUCCESS, LOGIN_ERROR, RESET_PASSWORD, RESET_PASSWORD_ERROR} from '../actions/types';

const initialState = {
    authError: null,
    loginError: null,
    signupError: null,
    resetPasswordError: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGNUP_SUCCESS:
            console.log('logging in successful')
            return {
                ...state,
                authError: null,
                signupError: null
            };
        case SIGNUP_ERROR:
            console.log('signup error');
            return {
                ...state,
                authError: action.payload,
                signupError: 'Ooops! Something went wrong. Please try again.'
            }
        case LOGIN_SUCCESS:
            console.log('login successful');
            return {
                ...state,
                authError: null,
                loginError: null,
            }
        case LOGIN_ERROR:
            console.log('login failed');
            return {
                ...state,
                authError: action.payload,
                loginError: 'E-mail or passowrd are incorrect.'
            }
        case LOG_OUT:
            console.log('logging out')
            return state;
        case RESET_PASSWORD:
            console.log('sent email for resetting');
            return state;
        case RESET_PASSWORD_ERROR:
            console.log('reset failed');
            return {
                ...state,
                resetPasswordError: action.payload.err
            }
        default:
            return state;
    }
}

export default authReducer;