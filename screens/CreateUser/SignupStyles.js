import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'grey',
  },
  inputStyle: {
    margin: 5,
    backgroundColor: 'white',
  },
  ModalButtonView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  modalView: {
    position: 'absolute',
    width: '100%',
    bottom: 2,
    height: 100,
    backgroundColor: '#999090',
  },
});
export default styles;
