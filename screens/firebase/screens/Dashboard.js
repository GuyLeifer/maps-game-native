import React, { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { db, storage } from "../firebase";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

export default function Dashboard({ navigation }) {
    const [error, setError] = useState("");

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [age, setAge] = useState();
    const [gender, setGender] = useState();
    const [email, setEmail] = useState();
    const [picture, setPicture] = useState();

    const { currentUser, logout } = useAuth();

    useEffect(() => {
        db.collection("users")
            .doc(`${currentUser.uid}`)
            .get()
            .then(doc => {
                const data = doc.data();
                // setters
                if (data) {
                    setFirstName(data.firstName);
                    setLastName(data.lastName);
                    setAge(data.age);
                    setGender(data.gender);
                    setEmail(data.email);
                    storage.ref().child(`users/${currentUser.uid}/profile`).getDownloadURL().then(function (url) {
                        setPicture(url)
                    }).catch(err => {
                        console.log(err.massage)
                    })
                } else console.log("no data")
            });
    }, [])


    async function handleLogout() {
        setError("")
        try {
            navigation.navigate('Login')
            await logout()
        } catch {
            setError("Failed to log out")
        }
    }

    return (
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}>
            <View>
                <Text style={styles.title}>Profile</Text>
                <View style={styles.scroll}>
                    <ScrollView>
                        {(currentUser && currentUser.displayName) &&
                            <View>
                                <Text style={styles.text}>Username: {currentUser.displayName}</Text>
                            </View>
                        }
                        {firstName &&
                            <View>
                                <Text style={styles.text}>First Name: {firstName}</Text>
                            </View>
                        }
                        {lastName &&
                            <View>
                                <Text style={styles.text}>Last Name: {lastName}</Text>
                            </View>
                        }
                        {(email || (currentUser && currentUser.email)) &&
                            <View>
                                <Text style={styles.text}>Email: {currentUser.email || email}</Text>
                            </View>
                        }
                        {age &&
                            <View>
                                <Text style={styles.text}>Age: {age}</Text>
                            </View>
                        }
                        {gender &&
                            <View>
                                <Text style={styles.text}>Gender: {gender}</Text>
                            </View>
                        }
                        {picture &&
                            <View>
                                <Text style={styles.text}>Profile Picture:</Text>
                                <Image className="profilePicture" source={`${picture}`} />
                            </View>
                        }
                        {(currentUser && currentUser.photoURL) &&
                            <View>
                                <Text style={styles.text}>Profile Picture:</Text>
                                <Image className="profilePicture" source={`${currentUser.photoURL}`} />
                            </View>
                        }
                    </ScrollView>
                </View>
            </View>

            <TouchableOpacity style={styles.appButtonContainer} onPress={handleLogout}>
                <Text style={styles.appButtonText}>Log Out</Text>
            </TouchableOpacity>

        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginBottom: '1%',
    },
    title: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    scroll: {
        flex: 0.5,
    },
    text: {
        textAlign: 'center',
        color: 'white',
        fontSize: 15,
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
