import Firebase from 'firebase/app'
import firebaseConfig from './config'

// Initialize Firebase
export const firebaseApp = Firebase.initializeApp(firebaseConfig.firebase);
