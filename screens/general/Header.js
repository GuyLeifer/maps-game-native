import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

function Header() {
    return (
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#4c669f', '#3b5998', '#192f6a']} >
            <Text style={styles.h1}>Welcome To Israel Nation Map Game</Text>
            <Text style={styles.h2}>This is a "Find The Place" Game</Text>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    h1: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        textShadowColor: 'black',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 10,
        fontWeight: 'bold',
    },
    h2: {
        color: 'white',
        fontSize: 17,
        textAlign: 'center',
        fontWeight: 'bold',
    },
})

export default Header