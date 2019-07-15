import * as firebase from 'firebase'
import firebaseConfig from './config'

// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig.firebase);
