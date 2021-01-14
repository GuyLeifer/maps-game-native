import React, { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { StyleSheet, View, Text, Image, ScrollView, Button, TouchableOpacity, TouchableWithoutFeedback, TextInput, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { LinearGradient } from 'expo-linear-gradient';


import { useAuth } from "../contexts/AuthContext";


function Login({ navigation }) {

    const { control, handleSubmit, errors } = useForm();
    const [error, setError] = useState()

    const { login, googleLogin, facebookLogin } = useAuth()


    const handleLogin = async ({ email, password }) => {
        try {
            setError("")
            await login(email, password);
            navigation.navigate('About')
        } catch {
            setError("Failed to log in")
        }
    }

    async function handleGoogleLogin() {
        try {
            setError("")
            await googleLogin();
            navigation.navigate('About')
        } catch {
            setError("Failed to log in")
        }
    }
    async function handleFacebookLogin() {
        try {
            setError("")
            await facebookLogin();
            navigation.navigate('About')
        } catch {
            setError("Failed to log in")
        }
    }

    return (
        <TouchableWithoutFeedback
            style={{ flex: 1 }}
            onPress={() => Keyboard.dismiss()}
        >
            <ScrollView
                style={{ flex: 1 }}
            >
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}>
                    <View>
                        <Text style={styles.header}>Log - in</Text>
                    </View>
                    <View style={styles.icons}>
                        <TouchableOpacity
                            style={{ flex: 0.5 }}
                            onPress={handleGoogleLogin}
                        >
                            <Image source={require('./images/googleIcon.png')} style={styles.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleFacebookLogin}>
                            <Image source={require('./images/facebookIcon.png')} style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={styles.text}>Or Login With Email Account</Text>
                        <View style={styles.form}>
                            {/* {error && <Text style={styles.text}>{error}</Text>} */}
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
                            {error ? <Text style={styles.textErr}>{error}</Text> : null}
                            <TouchableOpacity style={styles.appButtonContainer} onPress={handleSubmit(handleLogin)} >
                                <Text style={styles.appButtonText}>Log In</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => console.log("forgot password")}>
                                <Text style={styles.forgetText}>Forgot Password?</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={styles.forgetText}>Need an account?</Text>
                            <TouchableOpacity style={styles.appButtonContainer} onPress={() => navigation.navigate('SignIn')} >
                                <Text style={styles.appButtonText}>Sign Up</Text>
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
    }
})

export default Login
