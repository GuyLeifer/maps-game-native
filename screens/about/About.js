import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import GameInfo from './GameInfo'
import GoogleMapsIcon from './images/googleMapsIcon.png';
import { useAuth } from "../firebase/contexts/AuthContext"

function About({ navigation }) {

    const { currentUser } = useAuth()

    return (
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}>
            <View>
                <Text style={styles.title}>Google - Maps game</Text>
            </View>
            <View>
                <Image style={styles.image} source={GoogleMapsIcon} />
            </View>
            <View style={styles.view}>
                <Text style={styles.textRules}>Game Rules:</Text>
                <Text style={styles.textRules}>Every game has 10 Rounds</Text>
                <Text style={styles.textRules}>Every round you'll get a location</Text>
                <Text style={styles.textRules}>You need to locate the location on the map</Text>
            </View>
            <View style={styles.view}>
                <Text style={styles.textPoint}>As close as you will locate the location,</Text>
                <Text style={styles.textPoint}>you'll get points:</Text>
                <Text style={styles.textPoint}>100 points - 10 KM</Text>
                <Text style={styles.textPoint}>90 points - 20 KM</Text>
                <Text style={styles.textPoint}>80 points - 30 KM</Text>
                <Text style={styles.textPoint}>60 points - 40 KM</Text>
                <Text style={styles.textPoint}>40 points - 50 KM</Text>
            </View>
            <TouchableOpacity style={styles.appButtonContainer} onPress={() => { currentUser ? navigation.navigate('Home') : navigation.navigate('Login') }} >
                <Text style={styles.appButtonText}>{currentUser ? "Let's Play" : "Login"}</Text>
            </TouchableOpacity>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginVertical: '2%',
        justifyContent: 'space-evenly'
    },
    title: {
        fontSize: 24,
        color: 'white',
        textAlign: 'center',
        padding: '1%',
    },
    image: {
        width: 100,
        height: 100,
        margin: '5%',
        borderRadius: 100,
    },
    view: {
        alignItems: 'center',
        alignContent: 'center',
    },
    textRules: {
        color: 'white',
        fontSize: 18,
    },
    textPoint: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#fff",
        borderRadius: 10,
        marginVertical: 10,
        paddingHorizontal: 10
    },
    appButtonText: {
        fontSize: 15,
        color: "darkblue",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
})

export default About
