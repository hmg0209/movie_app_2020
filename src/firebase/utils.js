import firebase from 'firebase/app';
import firebaseConfig from './firebase.config';
import 'firebase/auth';
import 'firebase/database';

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth();
export const dataBase = firebase.database();

const provider = new firebase.auth.GoogleAuthProvider();
// alwayse popup open
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
