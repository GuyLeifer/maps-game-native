import * as firebase from "firebase";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

import serviceAccount from './firebase.json';

try {
    firebase.initializeApp(serviceAccount);
} catch (e) {
    console.log(e.message)
}

export const auth = firebase.auth();
export const storage = firebase.storage();
export const db = firebase.firestore();

export const loginWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider).then(function (result) {
    }).catch(function (error) {
        return error
    });
}
export const loginWithFacebook = async () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(provider).then(function (result) {
    }).catch(function (error) {
        return error
    });
}

export default firebase;