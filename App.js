import React from 'react';
import { StyleSheet, View } from 'react-native';

import Navbar from './screens/general/Navbar'
import Header from './screens/general/Header'
import Footer from './screens/general/Footer'

import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from "./navigation/drawerNavigator";
import { navigationRef } from './navigation/rootNavigation';

import { AuthProvider } from './screens/firebase/contexts/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <View style={styles.container}>
        <NavigationContainer ref={navigationRef}>

          <View style={styles.navbar}>
            <Navbar />
          </View>

          <View style={styles.header}>
            <Header />
          </View>
          <View style={styles.navigator}>
            <DrawerNavigator />
          </View>
          <View style={styles.footer}>
            <Footer />
          </View>

        </NavigationContainer>
      </View>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  navbar: {
    flex: 0.1,
    marginTop: 25,
  },
  header: {
    flex: 0.1,
    marginTop: 10,
  },
  navigator: {
    flex: 1,
  },
  footer: {
    flex: 0.1,
  },
});
