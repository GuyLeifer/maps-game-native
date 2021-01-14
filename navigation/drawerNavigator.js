import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import AccountStackNavigator from './stackNavigator'

import Map from '../screens/game/Map'
import About from '../screens/about/About'

import { useAuth } from "../screens/firebase/contexts/AuthContext"

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {

    const { currentUser } = useAuth()

    return (
        <Drawer.Navigator
            drawerStyle={{
                backgroundColor: '#3b5998',
                width: 150,
            }}
            drawerContentOptions={{
                activeTintColor: 'white',
                itemStyle: { paddingVertical: 7 },
                labelStyle: {
                    fontSize: 20,
                },
                inactiveTintColor: 'black',
            }}
        >
            {currentUser &&
                <Drawer.Screen
                    name="Home" component={Map}
                    options={({ navigation }) => ({
                        headerLeft: () => (
                            <DrawerButton onPress={() => navigation.toggleDrawer()} />
                        ),
                    })}
                />
            }
            <Drawer.Screen name="Account" component={AccountStackNavigator} />
            <Drawer.Screen name="About" component={About} />
        </Drawer.Navigator>
    );
}

export default DrawerNavigator;