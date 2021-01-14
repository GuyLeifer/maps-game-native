import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../screens/firebase/screens/Login";
import SignIn from "../screens/firebase/screens/SignIn";

const Stack = createStackNavigator();

const screenOptionStyle = {
    headerShown: false
};

const AccountStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={screenOptionStyle}
        >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignIn" component={SignIn} />
        </Stack.Navigator>
    );
}

export default AccountStackNavigator;