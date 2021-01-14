import React, { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { StyleSheet, View, Text, Image, ScrollView, Button, TouchableOpacity, TouchableWithoutFeedback, TextInput } from 'react-native';
import { Picker } from '@react-native-community/picker'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { LinearGradient } from 'expo-linear-gradient';
import firebase, { loginWithGoogle, loginWithFacebook } from '../firebase.js'

import { useAuth } from "../contexts/AuthContext";

function Login({ navigation }) {

    const { control, handleSubmit, errors } = useForm();
    const [err, setErr] = useState()
    const [selectedGender, setSelectedGender] = useState("Male");

    const { signup } = useAuth();

    const signIn = async ({ firstName, lastName, age, gender, email, password, passwordConfirmation }) => {
        if (password !== passwordConfirmation) {
            setErr("Passwords do not match")
        } else {
            try {
                await signup(email, password, firstName, lastName, age, gender)
                setError("")
            } catch {
                setError("Failed to create an account")
            }
        }
    }

    return (
        <TouchableWithoutFeedback
            style={{ flex: 1 }}
        // onPress={() => Keyboard.dismiss()} 
        >
            <ScrollView
                style={{ flex: 1 }}
            // contentContainerStyle={{ flex: 1 }}
            >
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}>
                    <View>
                        <Text style={styles.header}>Sign - Up</Text>
                    </View>
                    <View>
                        <View style={styles.form}>
                            <Controller
                                control={control}
                                render={({ onChange, onBlur, value }) => (
                                    <View style={styles.viewLabel}>
                                        <Text style={styles.label}>First Name:</Text>
                                        <TextInput
                                            style={styles.input}
                                            onBlur={onBlur}
                                            onChangeText={value => onChange(value)}
                                            value={value}
                                        />
                                    </View>
                                )}
                                name="firstName"
                                rules={{ required: true }}
                                defaultValue=""
                            />
                            {errors.firstName && <Text style={styles.textErr}>First Name is required.</Text>}

                            <Controller
                                control={control}
                                render={({ onChange, onBlur, value }) => (
                                    <View style={styles.viewLabel}>
                                        <Text style={styles.label}>Last Name:</Text>
                                        <TextInput
                                            style={styles.input}
                                            onBlur={onBlur}
                                            onChangeText={value => onChange(value)}
                                            value={value}
                                        />
                                    </View>
                                )}
                                name="lastName"
                                rules={{ required: true }}
                                defaultValue=""
                            />
                            {errors.lastName && <Text style={styles.textErr}>Last Name is required.</Text>}

                            <Controller
                                control={control}
                                render={({ onChange, onBlur, value }) => (
                                    <View style={styles.viewLabel}>
                                        <Text style={styles.label}>Age:</Text>
                                        <TextInput
                                            style={styles.input}
                                            onBlur={onBlur}
                                            onChangeText={value => onChange(value)}
                                            value={value}
                                            keyboardType='number-pad'
                                        />
                                    </View>
                                )}
                                name="age"
                                rules={{ required: true }}
                                defaultValue=""
                            />
                            {errors.age && <Text style={styles.textErr}>Age is required.</Text>}

                            <View style={styles.genderLabel}>
                                <Text style={styles.label}>Gender:</Text>
                                <View style={styles.input}>
                                    <Picker
                                        selectedValue={selectedGender}
                                        style={{ height: 50, width: '100%', color: 'white' }}
                                        onValueChange={(itemValue, itemIndex) => setSelectedGender(itemValue)}
                                    >
                                        <Picker.Item label="Male" value="Male" />
                                        <Picker.Item label="Female" value="Female" />
                                    </Picker>
                                </View>
                            </View>

                            <Controller
                                control={control}
                                render={({ onChange, onBlur, value }) => (
                                    <View style={styles.viewLabel}>
                                        <Text style={styles.label}>Email:</Text>
                                        <TextInput
                                            style={styles.input}
                                            onBlur={onBlur}
                                            onChangeText={value => onChange(value)}
                                            value={value}
                                            keyboardType="email-address"
                                            textContentType="emailAddress"
                                        />
                                    </View>
                                )}
                                name="email"
                                rules={{ required: true }}
                                defaultValue=""
                            />
                            {errors.email && <Text style={styles.textErr}>E-mail is required.</Text>}

                            <Controller
                                control={control}
                                render={({ onChange, onBlur, value }) => (
                                    <View style={styles.viewLabel}>
                                        <Text style={styles.label}>Password:</Text>
                                        <TextInput
                                            style={styles.input}
                                            onBlur={onBlur}
                                            onChangeText={value => onChange(value)}
                                            value={value}
                                            secureTextEntry={true}
                                        />
                                    </View>
                                )}
                                name="password"
                                rules={{ required: true }}
                                defaultValue=""
                            />
                            {errors.password && <Text style={styles.textErr}>Password is required.</Text>}

                            <Controller
                                control={control}
                                render={({ onChange, onBlur, value }) => (
                                    <View style={styles.viewLabel}>
                                        <Text style={styles.label}>Password Confirmation:</Text>
                                        <TextInput
                                            style={styles.input}
                                            onBlur={onBlur}
                                            onChangeText={value => onChange(value)}
                                            value={value}
                                            secureTextEntry={true}
                                        />
                                    </View>
                                )}
                                name="passwordConfirmation"
                                rules={{ required: true }}
                                defaultValue=""
                            />
                            {errors.passwordConfirmation && <Text style={styles.textErr}>Password Confirmation is required.</Text>}


                            <TouchableOpacity style={styles.appButtonContainer} onPress={handleSubmit(signIn)}>
                                <Text style={styles.appButtonText}>Sign Up</Text>
                            </TouchableOpacity>
                            {err && <Text style={styles.textErr}>{err}</Text>}
                        </View>
                        <View>
                            <Text style={styles.forgetText}>Already have an account?</Text>
                            <TouchableOpacity style={styles.appButtonContainer} onPress={() => navigation.navigate('Login')}>
                                <Text style={styles.appButtonText}>Log In</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* </KeyboardAwareScrollView> */}
                </LinearGradient>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginVertical: '2%',
        justifyContent: 'space-evenly'
    },
    header: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
        letterSpacing: 1,
        textAlign: 'center',
    },
    icons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '2%',
    },
    iconTouch: {
        alignItems: 'center',
    },
    icon: {
        height: 40,
        width: 40,
        borderRadius: 100,
    },
    text: {
        textAlign: 'center',
        color: 'white',
    },
    textErr: {
        textAlign: 'center',
        color: '#ff0000',
    },
    form: {
        borderWidth: 2,
        borderColor: 'white',
        margin: '2%',
    },
    viewLabel: {
        padding: 10,
    },
    label: {
        color: 'white',
        textAlign: 'center',
        margin: '2%',
    },
    input: {
        borderWidth: 1,
        fontSize: 20,
        width: 200,
        borderColor: 'white',
        color: 'white',
        paddingHorizontal: '5%',
        textAlign: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 22,
        // padding: 10,
        backgroundColor: '#494f52',
    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#fff",
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 60
    },
    appButtonText: {
        fontSize: 15,
        color: "darkblue",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    forgetText: {
        color: 'white',
        textAlign: 'center',
    },
    picker: {
        flex: 1,
        paddingTop: 40,
        alignItems: "center"
    },
    genderLabel: {
        alignItems: "center"
    },
})

export default Login
