import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import "firebase/firestore";

import withFirebaseAuth from "react-with-firebase-auth";

import firebaseConfig from "./firebaseConfig";

const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.analytics();
const firebaseAppAuth = firebaseApp.auth();
const db = firebase.firestore();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider()
};

//adding scopes
providers.googleProvider.addScope("openid");
providers.googleProvider.addScope("profile");
providers.googleProvider.addScope("email");

//create a FireBase wrapper to wrap the class around
const createComponentWithAuth = withFirebaseAuth({
  providers,
  firebaseAppAuth,
  db,
  firebase
});

export { db, createComponentWithAuth };
