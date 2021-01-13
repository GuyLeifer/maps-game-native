import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import Home from '../screens/home/Home'
import About from '../screens/about/About'


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
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
            <Drawer.Screen
                name="Home" component={Home}
                options={({ navigation }) => ({
                    headerLeft: () => (
                        <DrawerButton onPress={() => navigation.toggleDrawer()} />
                    ),
                })}
            />
            <Drawer.Screen name="About" component={About} />
        </Drawer.Navigator>
    );
}

export default DrawerNavigator;