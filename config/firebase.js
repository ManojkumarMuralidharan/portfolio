import * as firebase from 'firebase/app';
import 'firebase/database';

const FirebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId
};
//https://stackoverflow.com/questions/35418143/how-to-restrict-firebase-data-modification
export default firebase.initializeApp(FirebaseConfig);
