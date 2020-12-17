import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import styles from './LoginStyles';
const LoginForm = () => {
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.Container}>
      <TextInput
        placeholder="Insert your Roll number!"
        style={styles.input}
        returnKeyType="next"
        keyboardType="default"
        // onSubmitEditing={() => this.secondTextInput.focus()}
      />
      <TextInput
        placeholder="password"
        style={styles.input}
        secureTextEntry
        returnKeyType="go"
        // ref={input => (this.secondTextInput = input)}
      />
    </KeyboardAvoidingView>
  );
};

export default LoginForm;
