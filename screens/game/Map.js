import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native';
import { AsyncStorage } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from 'react-native-maps';
// import SweetAlert from 'react-native-sweet-alert';
import GameControl from './GameControl';

import { getDistanceFromLatLonInKm } from './helpers';
import Locations from "../../cities.json";

function Map() {

    // states

    const [randomLocation, setRandomLocation] = useState({}); // choose random location from the list
    const [chosenLocation, setChosenLocation] = useState({}); // chosen location of user
    const [showCorrectLocation, setShowCorrectLocation] = useState(false); // show the real correct location


    // states for game controller
    const [score, setScore] = useState(0); // Cumulative Score
    const [highScore, setHighScore] = useState(); // high score for local storage
    const [bigCitiesHighScore, setBigCitiesHighScore] = useState(); // high score of easy mode for local storage

    const [hint, setHint] = useState(false); // hint setter
    const [roundCounter, setRoundCounter] = useState(1); // round amount counter

    const [distanceFromTarget, setDistanceFromTarget] = useState(); // distance from target

    const [onlyBigCities, setOnlyBigCities] = useState(false); // option for easy mode

    const [knownLocations, setKnownLocations] = useState([]);
    const [unknownLocations, setUnknownLocations] = useState([]);

    const [newGame, setNewGame] = useState(false)
    const [endGame, setEndGame] = useState(false)

    //- check the high score from local storage
    useEffect(() =>
        async () => {
            try {
                const savedHighScore = await AsyncStorage.getItem("highScore");
                setHighScore(savedHighScore);
                const savedHighScoreBigCities = await AsyncStorage.getItem("bigCitiesHighScore");
                setBigCitiesHighScore(savedHighScoreBigCities);
            } catch (error) {
                console.log(error.message)
            }

        }, []);

    //functions
    const getRandomLocation = () => {
        if (onlyBigCities) {
            const bigCities = Locations.filter((location) => location.MGLSDE_L_1 >= 40000)
            const newLocation = bigCities[Math.floor(Math.random() * bigCities.length)];
            if (knownLocations.find(location => location === newLocation.MGLSDE_L_4) || unknownLocations.find(location => location === newLocation.MGLSDE_L_4)) {
                console.log("have been found")
                return getRandomLocation()
            } else {
                return newLocation
            }
        }
        else {
            const newLocation = Locations[Math.floor(Math.random() * Locations.length)];
            if (knownLocations.find(location => location === newLocation.MGLSDE_L_4) || unknownLocations.find(location => location === newLocation.MGLSDE_L_4)) {
                return getRandomLocation()
            } else {
                return newLocation
            }
        }
    };

    // callbacks
    // start a new round
    const startRound = useCallback(() => {
        let location = getRandomLocation();
        setRandomLocation({
            longitude: location.X,
            latitude: location.Y,
            name: location.MGLSDE_L_4,
        });
    }, [onlyBigCities, newGame, knownLocations, unknownLocations]);

    const onMapClick = async (coordinate) => {
        if (!showCorrectLocation) {
            setChosenLocation({
                longitude: coordinate.longitude,
                latitude: coordinate.latitude,
            });
            setShowCorrectLocation(true)

            // distance
            let distance = getDistanceFromLatLonInKm(
                coordinate.latitude,
                coordinate.longitude,
                randomLocation.latitude,
                randomLocation.longitude
            );
            distance = Math.round(distance);
            setDistanceFromTarget(distance);

            if (roundCounter === 10) {
                setEndGame(true)

                let known = `Known Locations:\n`;
                knownLocations.forEach((location => known += location + ", "))
                let unknown = `\n\nUnknown Locations:\n`
                unknownLocations.forEach((location => unknown += location + ", "))

                // Relevant Score and Relevant Summary
                let relevantScore;
                if (distance < 10) {
                    relevantScore = score + 100
                    known += randomLocation.name
                }
                else if (distance < 20) {
                    relevantScore = score + 90
                    known += randomLocation.name
                }
                else if (distance < 30) {
                    relevantScore = score + 80
                    known += randomLocation.name
                }
                else if (distance < 40) {
                    relevantScore = score + 60
                    known += randomLocation.name
                }
                else if (distance < 50) {
                    relevantScore = score + 40
                    known += randomLocation.name
                }
                else {
                    relevantScore = score
                    unknown += randomLocation.name
                }
                setScore(relevantScore)
                const summaryString = known + unknown;

                if (onlyBigCities && (relevantScore > bigCitiesHighScore || !bigCitiesHighScore)) {
                    setBigCitiesHighScore(relevantScore);
                    try {
                        await AsyncStorage.setItem("bigCitiesHighScore", relevantScore);
                    } catch (err) {
                        console.log(err.message);
                    }
                    Alert.alert("Wow", `New Record\nYou've been finished the Game,\nyour Score is: ${relevantScore}`)
                    Alert.alert("Summary", summaryString)
                } else if (!onlyBigCities && (relevantScore > highScore || !highScore)) {
                    setHighScore(relevantScore);
                    try {
                        await AsyncStorage.setItem("highScore", relevantScore);
                    } catch (err) {
                        console.log(err.message)
                    }
                    Alert.alert("Wow", `New Record\nYou've been finished the Game,\nyour Score is: ${relevantScore}`)
                    Alert.alert("Summary", summaryString)
                } else {
                    Alert.alert("Congratulations", `You've been finished the Game,\nyour Score is: ${relevantScore}`)
                    Alert.alert("Summary", summaryString)
                }
            } else {
                // Cumulative score and alert points
                if (distance < 10) {
                    setScore((prev) => prev + 100);
                    setKnownLocations(prev => [...prev, randomLocation.name]);
                    Alert.alert("Great", "Your Distance from the target was: " + String(distance) + " Kilometers, You Got 100 Points!")
                } else if (distance < 20) {
                    setScore((prev) => prev + 90);
                    setKnownLocations(prev => [...prev, randomLocation.name]);
                    Alert.alert("Almost", "Your Distance from the target was: " + String(distance) + " Kilometers, You Got 90 Points!")
                } else if (distance < 30) {
                    setScore((prev) => prev + 80);
                    setKnownLocations(prev => [...prev, randomLocation.name]);
                    Alert.alert("very Good", "Your Distance from the target was: " + String(distance) + " Kilometers, You Got 80 Points!")
                } else if (distance < 40) {
                    setScore((prev) => prev + 60);
                    setKnownLocations(prev => [...prev, randomLocation.name]);
                    Alert.alert("Good", "Your Distance from the target was: " + String(distance) + " Kilometers, You Got 60 Points!")
                } else if (distance < 50) {
                    setScore((prev) => prev + 40);
                    setKnownLocations(prev => [...prev, randomLocation.name]);
                    Alert.alert("Better Next Time", "Your Distance from the target was: " + String(distance) + " Kilometers, You Got 40 Points!")
                } else {
                    setUnknownLocations(prev => [...prev, randomLocation.name]);
                    Alert.alert("Wrong", "Your Distance from the target was: " + String(distance) + " Kilometers, You Got 0 Points!")
                }
            }
        }
    }

    const resetMap = useCallback((ended) => {
        if (showCorrectLocation || ended) {
            setHint(false);
            setShowCorrectLocation(false);
            setChosenLocation({});
            setRoundCounter((prev) => prev + 1);
            startRound();
        } else {
            Alert.alert("Error", "Finish the current round before going to the next round", "error");
        }
    },
        [showCorrectLocation, highScore, score, startRound]
    );

    useEffect(() => {
        setShowCorrectLocation(false);
        setEndGame(false)
        setNewGame(false)
        setRoundCounter(1);
        setScore(0);
        setChosenLocation({});
        setDistanceFromTarget();
        setHint(false);
        setKnownLocations([])
        setUnknownLocations([])
        startRound()
    }, [newGame, onlyBigCities]);

    return (
        <>
            <GameControl
                highScore={highScore}
                bigCitiesHighScore={bigCitiesHighScore}
                reset={resetMap}
                score={score}
                distance={distanceFromTarget}
                location={randomLocation.name}
                roundCounter={roundCounter}
                showCorrectLocation={showCorrectLocation}
                hintSetter={setHint}
                setOnlyBigCities={setOnlyBigCities}
                onlyBigCities={onlyBigCities}
                setNewGame={setNewGame}
                endGame={endGame}
                setEndGame={setEndGame}
            />

            <MapView
                style={{ flex: 1 }}
                provider={PROVIDER_GOOGLE}
                showsUserLocation
                initialRegion={{
                    latitude: 31.7797373515185,
                    longitude: 35.2095537973513,
                    latitudeDelta: 1,
                    longitudeDelta: 2
                }}
                onPress={e => onMapClick(e.nativeEvent.coordinate)}
                onMapReady={startRound}
                mapType={'satellite'}
            >
                {chosenLocation.hasOwnProperty('longitude') &&
                    <Marker
                        coordinate={{
                            latitude: chosenLocation.latitude,
                            longitude: chosenLocation.longitude,
                        }}
                    />
                }
                {showCorrectLocation &&
                    <Marker
                        coordinate={{
                            latitude: randomLocation.latitude,
                            longitude: randomLocation.longitude,
                        }}
                        pinColor="green"
                        onPress={() => Alert.alert(randomLocation.name, `latitude: ${randomLocation.latitude}\nlongitude: ${randomLocation.longitude}`)}
                    />
                }
                {hint && (
                    <Circle
                        radius={100000}
                        center={{
                            latitude: randomLocation.latitude + Math.random() / 1.6,
                            longitude: randomLocation.longitude + Math.random() / 1.6,
                        }}
                        // clickable={false}
                        strokeColor='#008800'
                        strokeOpacity={3}
                        strokeWeight={5}
                        // fillColor='#008800'
                        fillOpacity={0.2}
                        zIndex={-1}
                    >
                        <View style={{ backgroundColor: "blue", opacity: 0.5 }} />
                    </Circle>
                )}
            </MapView>
        </>
    )
}

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    // }
})

export default Map