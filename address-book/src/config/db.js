
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: REACT_APP_FIREBASE_KEY,
    authDomain: REACT_APP_DOMAIN,
    databaseURL: REACT_APP_DATABASE,
    projectId: REACT_APP_PROJECT_ID,
    storageBucket: REACT_APP_STORAGE_BUCKET,
    messagingSenderId: REACT_APP_SENDER_ID,
    appId: REACT_APP_APP_ID
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
