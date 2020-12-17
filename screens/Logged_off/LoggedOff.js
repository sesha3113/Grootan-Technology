////Student create data
import React, {Component, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Input,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import styles from './LoggedOffStyles';
import LoginForm from './LoginForm';
const LoggedOff = ({navigation: {navigate}}) => {
  const [rollnum, setRollnum] = useState('');
  const [password, setPassword] = useState('');
  const login = () => {
    fetch(' http://72fce82d305d.ngrok.io/student-singin/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rollnum,
        password,
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data._id);
        if (data !== 0) {
          console.log('received', data);
          navigate('Profiles', {
            name: data.name,
            rollnum: data.rollnum,
            phone: data.phone,
            email: data.email,
            _id: data._id,
            password: password,
            batch: data.batch,
            section: data.section,
            department: data.department,
          });
        } else {
          Alert.alert(
            ' ',
            'Enter valid roll num or password',
            [{text: 'OK', onPress: () => console.log('not matched')}],
            {cancelable: false},
          );
        }
      });
  };
  return (
    <View style={styles.Container}>
      <View style={styles.logoBox}>
        {/* <Image
          style={styles.logo}
          source={require('./assets/Vcet_logo-removebg-preview.png')}
        /> */}
      </View>
      <View style={styles.textView}>
        <Text> Login</Text>
      </View>
      <View>
        <TextInput
          placeholder="Insert your name!"
          style={styles.input}
          returnKeyType="next"
          keyboardType="default"
          value={rollnum}
          onChangeText={text => setRollnum(text)}
          // onSubmitEditing={() => this.secondTextInput.focus()}
        />
        {/* <TextInput
          label="Roll Number"
          style={styles.inputStyle}
          value={rollnum}
          mode="outlined"
          onChangeText={text => setRollnum(text)}
        /> */}
        <TextInput
          placeholder="phone number"
          style={styles.input}
          secureTextEntry
          value={password}
          returnKeyType="go"
          onChangeText={text => setPassword(text)}
          // ref={input => (this.secondTextInput = input)}
        />
      </View>
      <View>
        <TouchableOpacity
          style={styles.buttonContainerL}
          onPress={() => login()}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => navigate('Signup')}>
          <Text style={styles.buttonContainer}> Not having a account?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default LoggedOff;
