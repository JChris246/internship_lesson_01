import firebase from "firebase/app";

// Add the Firebase services that you want to use
// import "firebase/auth";
import "firebase/firestore";
import "firebase/auth";

var firebaseConfig = {
    apiKey: "AIzaSyC60kxswNnWbqMzdJosPRpPeeRPbS4g9ac",
    authDomain: "internship01-5cbbf.firebaseapp.com",
    projectId: "internship01-5cbbf",
    storageBucket: "internship01-5cbbf.appspot.com",
    messagingSenderId: "239850786193",
    appId: "1:239850786193:web:86a873d8dcb8f98f0fde30"
};

// Initialize Firebase
try {
    firebase.initializeApp(firebaseConfig);
} catch (err) {
    console.log('Firebase already initialized')
}

const db = firebase.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GithubAuthProvider().setCustomParameters({
    'allow_signup': 'false'
});
  

export const firestore = {
    db: db, 
    auth: auth,
    githubProvider: provider
};