import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Modal,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {PERMISSIONS} from 'react-native-permissions';
import ImagePicker from 'react-native-image-crop-picker';
import styles from './Teacher_signup_Styles';

const Teacher_Signup = ({navigation: {navigate}, route}) => {
  useEffect(() => {
    console.log('name' + name);
    console.log(email);
    console.log(phone);
    console.log(batch);
    console.log(section);
    console.log(department);
  });

  const getDetails = type => {
    if (route.params) {
      const {_id} = route.params._id;
      switch (type) {
        case 'name':
          return route.params.name;
        case 'email':
          return route.params.email;
        case 'phone':
          return route.params.phone;
        case 'password':
          return route.params.password;
        case 'section':
          return route.params.section;
        case 'department':
          return route.params.department;
        case 'batch':
          return route.params.batch;
      }
    }
    return '';
  };

  const [name, setName] = useState(getDetails('name'));
  const [phone, setPhone] = useState(getDetails('phone'));
  const [email, setEmail] = useState(getDetails('email'));
  const [picture, setPicture] = useState('');
  const [password, setPassword] = useState(getDetails('password'));
  const [batch, setBatch] = useState(getDetails('batch'));
  const [department, setDepartment] = useState(getDetails('department'));
  const [section, setSection] = useState(getDetails('section'));
  const [modal, setModal] = useState(false);
  const [value, onChangeText] = React.useState('Useless Placeholder');

  const signup = () => {
    fetch('http://04dfb5b2e4a1.ngrok.io/send-teacher-data/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        picture,
        password,
        phone,
        batch,
        department,
        section,
      }),
    })
      .then(res => JSON.parse(res))
      .then(data => {
        console.log('data', data);
        Alert.alert('saved');
        // navigate('LoggedOff');
      });
  };

  const updateDetails = () => {
    fetch('http://04dfb5b2e4a1.ngrok.io/teacher-update/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id: route.params._id,
        name,
        email,
        phone,
        picture,
        password: route.params.password,
        section,
        batch,
        department,
      }),
    })
      .then(res => JSON.parse(res))
      .then(data => {
        console.log('updated data', data);
        Alert.alert('updated');
        // navigate('LoggedOff');
      });
  };

  return (
    <View style={styles.root}>
      <ScrollView>
        <KeyboardAvoidingView>
          <View style={styles.textView}>
            <Text style={{color: 'white'}}>Staff save and update</Text>
          </View>
          <TextInput
            label="Name"
            style={styles.inputStyle}
            value={name}
            theme={theme}
            mode="outlined"
            onChangeText={text => setName(text)}
          />
          <TextInput
            label="Email"
            style={styles.inputStyle}
            value={email}
            theme={theme}
            mode="outlined"
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            label="Phone"
            style={styles.inputStyle}
            value={phone}
            theme={theme}
            mode="outlined"
            keyboardType="number-pad"
            onChangeText={text => setPhone(text)}
          />
          <TextInput
            label="In_charge of batch"
            style={styles.inputStyle}
            value={batch}
            theme={theme}
            mode="outlined"
            onChangeText={text => setBatch(text)}
          />
          <TextInput
            label="In_charge of department"
            style={styles.inputStyle}
            value={department}
            theme={theme}
            mode="outlined"
            onChangeText={text => setDepartment(text)}
          />
          <TextInput
            label="In_charge of section"
            style={styles.inputStyle}
            value={section}
            theme={theme}
            mode="outlined"
            onChangeText={text => setSection(text)}
          />
          <TextInput
            label="Password"
            style={styles.inputStyle}
            value={password}
            theme={theme}
            mode="outlined"
            onChangeText={text => setPassword(text)}
          />
          <Button mode="contained" onPress={() => setModal(true)}>
            Upload image
          </Button>
          {route.params ? (
            <Button
              style={{marginTop: 10}}
              mode="contained"
              onPress={() => {
                updateDetails();
                Alert.alert(
                  ' ',
                  'Account Saved',
                  [{text: 'OK', onPress: () => navigate('Teacher_LoggedOff')}],
                  {cancelable: false},
                );
              }}>
              Update
            </Button>
          ) : (
            <Button
              style={{marginTop: 10}}
              mode="contained"
              onPress={() => {
                signup();
                Alert.alert(
                  ' ',
                  'Account Saved',
                  [{text: 'OK', onPress: () => navigate('LoggedOff')}],
                  {cancelable: false},
                );
              }}>
              Save
            </Button>
          )}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modal}
            onRequestClose={() => setModal(false)}>
            <View style={styles.modalView}>
              <View style={styles.ModalButtonView}>
                <Button
                  theme={theme}
                  mode="contained"
                  onPress={() => takeImage()}>
                  Camera
                </Button>

                <Button
                  theme={theme}
                  mode="contained"
                  onPress={() => chooseImage()}>
                  Gallery
                </Button>
              </View>
              <Button theme={theme} onPress={() => setModal(false)}>
                Cancel
              </Button>
            </View>
          </Modal>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

const theme = {
  colors: {
    primary: 'violet',
  },
};
const takeImage = () => {
  ImagePicker.openCamera({
    width: 300,
    height: 400,
    cropping: true,
  }).then(image => {
    let newfile = {
      uri: image.path,
      type: `test/${image.path.split('.')[1]}`,
      name: `test.${image.path.split('.')[1]}`,
    };
    handleupload(newfile);
    console.log(image);
  });
};

const chooseImage = () => {
  ImagePicker.openPicker({
    width: 300,
    height: 400,
    cropping: true,
  }).then(image => {
    let newfile = {
      uri: image.path,
      type: `test/${image.path.split('.')[1]}`,
      name: `test.${image.path.split('.')[1]}`,
    };
    handleupload(newfile);
    console.log(image);
  });
};
const handleupload = image => {
  const data = new FormData();
  data.append('file', image);
  data.append('upload_preset', 'velammal');
  data.append('cloud_name', 'seshacloud');
  fetch('https://api.cloudinary.com/v1_1/seshacloud/image/upload', {
    method: 'post',
    body: image,
  })
    .then(res => res.json())
    .then(console.log(data));
};
export default Teacher_Signup;
