import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {reduxFirestore} from 'redux-firestore';
import rootReducer from './reducers/rootReducer';
import firebase from './firebase/config';

const store = createStore(rootReducer, compose(
  applyMiddleware(thunk),
  reduxFirestore(firebase),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

export default store;