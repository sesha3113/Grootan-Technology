import React, {component, useState} from 'react';
import {
  Text,
  View,
  Input,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import styles from './Teacher_Signin_Styles';
const Teacher_LoggedOff = ({navigation: {navigate}}) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    fetch('http://04dfb5b2e4a1.ngrok.io/teacher-singin/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone,
        password,
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data._id);
        if (data !== 0) {
          console.log('received', data);
          navigate('Teacher_Profile', {
            name: data.name,
            phone: data.phone,
            email: data.email,
            section: data.section,
            department: data.department,
            batch: data.batch,
            _id: data._id,
            password: password,
            picture: data.picture,
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
    <View>
      <View style={styles.logoBox}>
        <Image
          style={styles.logo}
          source={require('./assets/Vcet_logo-removebg-preview.png')}
        />
      </View>
      <View style={styles.TextView}>
        <Text>Staff Login</Text>
      </View>
      <View>
        <TextInput
          placeholder="Insert your phone number!"
          style={styles.input}
          returnKeyType="next"
          keyboardType="default"
          value={phone}
          onChangeText={text => setPhone(text)}
          // onSubmitEditing={() => this.secondTextInput.focus()}
        />
        <TextInput
          placeholder="password"
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
        <TouchableOpacity onPress={() => navigate('Teacher_Signup')}>
          <Text style={styles.buttonText}> Not having a account?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Teacher_LoggedOff;
