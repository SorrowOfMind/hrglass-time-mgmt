import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    //firebase config
};
firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;