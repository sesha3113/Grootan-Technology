import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import WelcomeStyles from './WelcomeStyles';
import {FAB} from 'react-native-paper';
import {StyleSheet} from 'react-native';
export default class Welcome extends Component {
  state = {};
  render() {
    return (
      <View style={WelcomeStyles.Container}>
        <View style={WelcomeStyles.TextStyle}>
          <Text style={WelcomeStyles.Text}>Grootan Tecgnology</Text>
        </View>
      </View>
    );
  }
}
