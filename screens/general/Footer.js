import React from 'react';
import { View, TouchableOpacity, ImageBackground, StyleSheet, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

function Footer() {

    return (
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container} >
            <TouchableOpacity
                onPress={() => Linking.openURL('https://www.facebook.com/guy.leifer')}
            >
                <ImageBackground
                    style={styles.image}
                    source={require('./images/facebookIcon.png')}
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.c}
                onPress={() => Linking.openURL('https://github.com/GuyLeifer')}
            >
                <ImageBackground
                    style={styles.image}
                    source={require('./images/githubIcon.png')}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => Linking.openURL('https://www.linkedin.com/in/guy-leifer-a7036a1b6/')}
            >
                <ImageBackground
                    style={styles.image}
                    source={require('./images/linkedinIcon.png')}
                />
            </TouchableOpacity>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#494f52',
        padding: '3%',
    },
    image: {
        width: 30,
        height: 30,
        margin: '3%',
        borderRadius: 50,
    },

})

export default Footer
