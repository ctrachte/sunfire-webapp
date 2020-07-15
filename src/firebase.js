import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAOaq4U08IMcj51Nq09G3muIdLJQEale9U",
    authDomain: "sunfire-web-app.firebaseapp.com",
    databaseURL: "https://sunfire-web-app.firebaseio.com",
    projectId: "sunfire-web-app",
    storageBucket: "sunfire-web-app.appspot.com",
    messagingSenderId: "571281861795",
    appId: "1:571281861795:web:8812631c86a71ff2802316",
    measurementId: "G-FM008RJQRH"
});

const db = firebaseApp.firestore();

export default db;