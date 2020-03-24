import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var config = {
    apiKey: "AIzaSyDL5Z8_go6q-rQ5rGgq-pGnlDYknCO8I8A",
    authDomain: "carownerapp-2e577.firebaseapp.com",
    databaseURL: "https://carownerapp-2e577.firebaseio.com",
    projectId: "carownerapp-2e577",
    storageBucket: "carownerapp-2e577.appspot.com",
    messagingSenderId: "392263749107",
    appId: "1:392263749107:web:857d598fe290ccc4d59686",
    measurementId: "G-LWD1711TC4"
};

firebase.initializeApp(config);

firebase.firestore().settings({timestampsInSnapshots: true});

export default firebase;
