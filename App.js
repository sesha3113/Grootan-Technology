/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import YourApp from './Screen/login/login';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

function App() {
  return (
    <View>
      <YourApp />
    </View>
  );
}

export default () => {
  return (
    <View>
      <App />
    </View>
  );
};
