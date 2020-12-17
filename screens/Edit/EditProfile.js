import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Modal,
  Image,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {PERMISSIONS} from 'react-native-permissions';
import ImagePicker from 'react-native-image-crop-picker';
import styles from './EditProfileStyles';

const EditProfile = ({navigation, route}) => {
  const {rollnum} = route.params;
  const {name} = route.params;
  const {email} = route.params;
  const {phone} = route.params;
  const {_id} = route.params;
  const {password} = route.params;

  const [namee, setName] = useState(name);
  const [phonee, setPhone] = useState(phone);
  const [emaill, setEmail] = useState(email);
  const [passwordd, setPassword] = useState(password);

  const [modal, setModal] = useState(false);

  const submitData = () => {
    console.log(namee);
    console.log(_id);
    fetch('http://fe6802668ae9.ngrok.io/update/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id: _id,
        name: namee,
        email: emaill,
        rollnum: rollnum,
        password: passwordd,
        phone: phonee,
      }),
    })
      .then(res => JSON.parse(res))
      .then(data => {
        console.log('data', data);
        Alert.alert('saved');
        // navigate('LoggedOff');
      });
  };

  return (
    <View style={styles.root}>
      <KeyboardAvoidingView>
        <TextInput
          label="Name"
          style={styles.inputStyle}
          value={namee}
          theme={theme}
          mode="outlined"
          onChangeText={text => setName(text)}
        />
        <TextInput
          label="Email"
          style={styles.inputStyle}
          value={emaill}
          theme={theme}
          mode="outlined"
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          label="Phone"
          style={styles.inputStyle}
          value={phonee}
          theme={theme}
          mode="outlined"
          keyboardType="number-pad"
          onChangeText={text => setPhone(text)}
        />
        <TextInput
          label="Password"
          style={styles.inputStyle}
          value={passwordd}
          theme={theme}
          mode="outlined"
          onChangeText={text => setPassword(text)}
        />
        <Button mode="contained" onPress={() => setModal(true)}>
          Upload image
        </Button>
        <Button
          style={{marginTop: 10}}
          mode="contained"
          onPress={() => {
            submitData();
            Alert.alert(
              ' ',
              'Account Saved',
              [{text: 'OK', onPress: () => navigation.navigate('Profiles')}],
              {cancelable: false},
            );
          }}>
          Update
        </Button>
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
export default EditProfile;
