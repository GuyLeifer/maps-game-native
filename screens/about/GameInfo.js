import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

function GameInfo() {
    return (
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#4c669f', '#3b5998', '#192f6a']} >
            <Text>Game Rules:</Text>
            <Text>Every game has 10 Rounds</Text>
            <Text>Every round you'll get a location</Text>
            <Text>You need to locate the location on the map</Text>
            <View>
                <Text>As close as you will locate the location you'll get points:</Text>
                <Text>100 points - 20 KM</Text>
                <Text>90 points - 40 KM</Text>
                <Text>80 points - 55 KM</Text>
                <Text>60 points - 80 KM</Text>
                <Text>40 points - 100 KM</Text>
            </View>
        </LinearGradient>
    )
}

export default GameInfo