import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
  
  
  // Your web app's Firebase configuration
  const dbaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.REACT_APP_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
  };

// initialize firebase
  firebase.initializeApp(dbaseConfig);
// initialize firestore
  firebase.firestore();

export default firebase;
