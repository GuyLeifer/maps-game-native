import * as firebase from "firebase";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

try {
    firebase.initializeApp({
        apiKey: "AIzaSyDl7tSvkG3Oo3cNJ_v_cJPHCbcZL4H6GTU",
        authDomain: "react-native-maps-301417.firebaseapp.com",
        projectId: "react-native-maps-301417",
        storageBucket: "react-native-maps-301417.appspot.com",
        messagingSenderId: "770638836183",
        appId: "1:770638836183:web:b6c1cadbca5e79df539b92",
        measurementId: "G-SDBXEMY3T5"
    });
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