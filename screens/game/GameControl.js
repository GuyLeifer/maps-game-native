import React, { useState, useCallback } from 'react';
import { View, Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

function GameControl({
    reset,
    score,
    distance,
    location,
    roundCounter,
    hintSetter,
    highScore,
    setOnlyBigCities,
    bigCitiesHighScore,
    bigCities,
    showCorrectLocation,
    setNewGame,
    endGame
}) {

    //states
    const [numOfHints, setNumOfHints] = useState(1);

    const handleHints = useCallback(() => {
        if (numOfHints > 0) {
            setNumOfHints((prev) => prev - 1);
            hintSetter((prev) => !prev);
        } else {
            Alert.alert("No Hints Left");
        }
    }, [numOfHints]);

    const handleReset = useCallback(
        () => {
            // if (roundCounter === 10) {
            //     setNumOfHints(1);
            //     reset(true);
            // } else {
            reset(false);
            // }
        },
        [roundCounter, reset]
    );
    const modeChange = (bool) => {
        setOnlyBigCities(bool)
        setNumOfHints(1)
    };


    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={styles.container}
        >
            <Text style={styles.title}>Game Controller</Text>
            <View style={styles.viewFlex}>
                {bigCities ?
                    <View style={styles.buttons}>
                        <TouchableOpacity
                            onPress={() => modeChange(false)}
                            style={styles.appButtonContainer}
                        >
                            <Text style={styles.appButtonText}>All Places</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            disabled={true}
                            style={styles.appButtonContainerDisabled}>
                            <Text style={styles.appButtonText}>Big Cities</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={styles.buttons}>
                        <TouchableOpacity
                            disabled={true}
                            style={styles.appButtonContainerDisabled}>
                            <Text style={styles.appButtonText}>All Places</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => modeChange(true)}
                            style={styles.appButtonContainer}>
                            <Text style={styles.appButtonText}>Big Cities</Text>
                        </TouchableOpacity>
                    </View>
                }

                <View style={styles.data}>
                    <View>
                        <Text style={styles.text}>Score: {score} Points</Text>
                        <Text style={styles.text}>Target: <Text style={styles.target}>{location}</Text></Text>
                    </View>
                    <View>
                        {distance && <Text style={styles.text}>Distance: {distance} KM</Text>}
                        <Text style={styles.text}>Round: {roundCounter}/10</Text>
                        {bigCities ?
                            bigCitiesHighScore && <Text style={styles.text}>High Score: {bigCitiesHighScore}</Text>
                            :
                            highScore && <Text style={styles.text}>High Score: {highScore}</Text>
                        }
                        <Text style={styles.text}>Hints Left: {numOfHints}</Text>
                    </View>
                </View>
                <View style={styles.buttons}>
                    {(!endGame && numOfHints > 0 && !showCorrectLocation) ?

                        <TouchableOpacity
                            onPress={handleHints}
                            style={styles.appButtonContainer}
                        >
                            <Text style={styles.appButtonText}>Get a Hint</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            style={styles.appButtonContainerDisabled}
                            disabled={true}
                        >
                            <Text style={styles.appButtonText}>Get a Hint</Text>
                        </TouchableOpacity>
                    }
                    {!endGame ? (
                        showCorrectLocation ?
                            <TouchableOpacity
                                onPress={handleReset}
                                style={styles.appButtonContainer}
                            >
                                <Text style={styles.appButtonText}>Next Turn</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                disabled={true}
                                style={styles.appButtonContainerDisabled}
                            >
                                <Text style={styles.appButtonText}>Next Turn</Text>
                            </TouchableOpacity>
                    ) :
                        <TouchableOpacity
                            onPress={() => setNewGame(true)}
                            style={styles.appButtonContainer}
                        >
                            <Text style={styles.appButtonText}>New Game</Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </LinearGradient >
    );
}

const styles = StyleSheet.create({
    container: {
    },
    title: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 17,
    },
    viewFlex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    data: {
        width: '40%',
    },
    text: {
        color: 'white',
        textAlign: 'center',
    },
    target: {
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    buttons: {
        margin: '1%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        margin: '1%',
    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#fff",
        borderRadius: 10,
        marginVertical: 10,
        paddingHorizontal: 5
    },
    appButtonContainerDisabled: {
        elevation: 8,
        backgroundColor: "#888",
        borderRadius: 10,
        marginVertical: 10,
        paddingHorizontal: 5
    },
    appButtonText: {
        fontSize: 15,
        color: "darkblue",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    }
})

export default GameControl;