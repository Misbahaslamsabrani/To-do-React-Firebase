import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDfa3C8UVRIXYFxfjTjpm3o1Itj8AGD3C8",
    authDomain: "to-do-react-firebasedb.firebaseapp.com",
    databaseURL: "https://to-do-react-firebasedb.firebaseio.com",
    projectId: "to-do-react-firebasedb",
    storageBucket: "to-do-react-firebasedb.appspot.com",
    messagingSenderId: "329421369986"
  };
  firebase.initializeApp(config);