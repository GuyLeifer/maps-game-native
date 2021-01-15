import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import * as RootNavigation from '../../navigation/rootNavigation';

//icons
import accountIcon from './images/accountIcon.jpg';

import { useAuth } from "../firebase/contexts/AuthContext"
// import { auth, storage } from '../firebaseAuth/firebase';

function Navbar() {

    const { currentUser } = useAuth()

    const [authIcon, setAuthIcon] = useState(accountIcon);

    // const { currentUser } = useAuth();
    // let uid = null;
    // let photoUrl = null;

    // if (currentUser != null) {
    //     photoUrl = currentUser.photoURL;
    //     uid = currentUser.uid;  // The user's ID, unique to the Firebase project. Do NOT use
    // }
    // storage.ref().child(`users/${uid}/profile`).getDownloadURL().then(function(url) {
    //     setAuthIcon(url)
    // }).catch(function(error) {
    //     if(photoUrl) setAuthIcon(photoUrl)
    // });

    // auth.onAuthStateChanged(function(user) {
    //     if(!user) setAuthIcon(accountIcon)
    // })

    const loginFirst = () => {
        Alert.alert("Oops..", "You can't play before you logged in\nPlease Login First\nEnjoy The Game!", [
            {
                text: "Log In", onPress: () => RootNavigation.navigate('Login'),
            },
            {
                text: "I dont have an account", onPress: () => RootNavigation.navigate('SignIn'),
            },
        ],
            { cancelable: false });
    }

    return (
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.navbar}>
            <TouchableOpacity onPress={() => RootNavigation.navigate('About')}>
                <Image
                    style={styles.icon}
                    source={require('./images/aboutIcon.png')}
                />
            </TouchableOpacity>
            <TouchableOpacity>
                <Image
                    style={styles.icon}
                    source={require('./images/israelIcon.png')}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { currentUser ? RootNavigation.navigate('Home') : loginFirst() }}>
                <Image
                    style={styles.icon}
                    source={require('./images/homeIcon.png')}
                />
            </TouchableOpacity>
            <TouchableOpacity>
                <Image
                    style={styles.icon}
                    source={require('./images/googleMapsIcon.png')}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { currentUser ? RootNavigation.navigate('Account', { screen: 'Dashboard' }) : RootNavigation.navigate('Account') }} >
                <Image
                    style={styles.icon}
                    source={require('./images/accountIcon.jpg')}
                />
            </TouchableOpacity>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    navbar: {
        position: 'absolute',
        width: '100%',
        // top: 25,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
    },
    icon: {
        height: 40,
        width: 40,
        borderRadius: 100,
    }
})

export default Navbar