import React, {component, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Input,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
const login = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const loginn = () => {
    console.log(name);
    console.log(age);

    fetch(' http://10.0.2.2:3000/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        age,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data._id);
        if (data !== 0) {
          console.log('received', data);
          // navigate('profile', {
          //   name: data.name,
          //   age: data.age,
          //   dob: data.dob,
          //   firstname: data.firstname,
          //   _id: data._id,
          //   lastname: data.lastname,
          //   address_line1: data.more.address_line1,
          //   address_line2: data.more.address_line2,
          //   address_line3: data.more.address_line3,
          //   phone: data.phone,
          // });
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
      <View>
        <View>
          <Text>Login</Text>
        </View>
        <View>
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={(text) => setName(text)}></TextInput>

          <TextInput
            placeholder="age"
            secureTextEntry
            value={age}
            returnKeyType="go"
            onChangeText={(text) => setAge(text)}
            // ref={input => (this.secondTextInput = input)}
          />
        </View>
        <View>
          <TouchableOpacity onPress={() => loginn()}>
            <Text>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default login;
