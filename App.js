/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import Profiles from './screens/Profile/Profiles';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {View, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Welcome from './screens/welcome/Welcome';
import LoggedOff from './screens/Logged_off/LoggedOff';
import Signup from './screens/CreateUser/Signup';
import LoginForm from './screens/Logged_off/LoginForm';
import EditProfiles from './screens/Edit/EditProfile';
import Teacher_LoggedOff from './screens/Teacher-signin/Teracher_Signin';
import Teacher_Signup from './screens/Teacher-signup/Teacher_signup';
import Teacher_Profile from './screens/Teacher_Profile/Teacher_Profile';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function App() {
  return (
    <View style={styles.container}>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Welcome" component={_Drawer} />
        <Stack.Screen name="LoggedOff" component={LoggedOff} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Profiles" component={Profiles} />
        <Stack.Screen name="LoginForm" component={LoginForm} />
        <Stack.Screen name="EditProfiles" component={EditProfiles} />
        <Stack.Screen name="Teacher_Profile" component={Teacher_Profile} />
      </Stack.Navigator>
    </View>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function _Drawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Welcome" component={Welcome} />
      {/* <Drawer.Screen name="Teacher_Signup" component={Teacher_Signup} /> */}
      {/* <Drawer.Screen name="Teacher_LoggedOff" component={Teacher_LoggedOff} />  */}
      <Drawer.Screen name="LoggedOff" component={LoggedOff} />
      <Drawer.Screen name="Signup" component={Signup} />
    </Drawer.Navigator>
  );
}
