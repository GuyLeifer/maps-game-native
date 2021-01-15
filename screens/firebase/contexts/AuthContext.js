import React, { useContext, useState, useEffect } from "react"
import { auth, storage, db, loginWithGoogle, loginWithFacebook } from "../firebase";
import * as GoogleSignIn from 'expo-google-sign-in';
import * as AppAuth from 'expo-app-auth'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  async function signup(email, password, file, firstName, lastName, age, gender) {
    return auth.createUserWithEmailAndPassword(email, password).then(auth => {
      const uid = auth.user.uid
      userDataCloud(uid, firstName, lastName, email, age, gender)
      storage.ref('users/' + uid + '/profile').put(file).then(() => {
        console.log('successfully upload profile image')
      })
    }).catch(err => console.log(err.massage))
  }

  function userDataCloud(userUid, firstName, lastName, email, age, gender) {
    db.collection('users').doc(`${userUid}`).set({
      userUid: userUid,
      firstName: firstName,
      lastName: lastName,
      email: email,
      age: age,
      gender: gender,
    }).then(function () {
      console.log("Document successfully written!");
    })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  };

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  const config = {
    issuer: 'https://accounts.google.com',
    // behavior: 'web',
    scopes: ['openid'],
    /* This is the CLIENT_ID generated from a Firebase project */
    clientId: '770638836183-ttrhs1n4h2g3e2mt3od3cr88kemqb7kt.apps.googleusercontent.com',
  };

  // let config = {
  //   issuer: 'https://accounts.google.com',
  //   scopes: ['openid', 'profile'],
  //   /* This is the CLIENT_ID generated from a Firebase project */
  //   clientId: '603386649315-vp4revvrcgrcjme51ebuhbkbspl048l9.apps.googleusercontent.com',
  // };

  const googleLogin = async () => {
    try {
      await GoogleSignIn.initAsync({
        clientId: '770638836183-ttrhs1n4h2g3e2mt3od3cr88kemqb7kt.apps.googleusercontent.com',
      });
    } catch ({ message }) {
      alert('GoogleSignIn.initAsync(): ' + message);
    }
  };
  const facebookLogin = async () => loginWithFacebook();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    googleLogin,
    facebookLogin
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
