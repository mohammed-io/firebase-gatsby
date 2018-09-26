import Firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCIJVlTMWS5guwayNCyP9A01jko7TijPBM",
    authDomain: "gallery-project-e1bc4.firebaseapp.com",
    databaseURL: "https://gallery-project-e1bc4.firebaseio.com",
    projectId: "gallery-project-e1bc4",
    storageBucket: "gallery-project-e1bc4.appspot.com",
    messagingSenderId: "789176939038"
};
export const FireApp = Firebase.initializeApp(config);