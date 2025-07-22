import {StyleSheet} from 'react-native';
import Colors from '../../utils/Colors';

export const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileImage: {
    width: 100,
    height: 100,
    margin: 15,
    borderRadius: 50,
    alignSelf: 'center',
  },
  inputField: {
    flex: 10,
    borderWidth: 1,
    borderRadius: 20,
    fontSize: 20,
    padding: 10,
    color: Colors.black,
    alignContent: 'center',
    margin: 25,
    marginBottom: 0,
  },
  submitButton: {
    backgroundColor: Colors.blue,
    borderRadius: 10,
    margin: 25,
    marginTop: 80,
    padding: 10,
    borderColor: Colors.white,
    borderWidth: 2,
  },
  submitText: {
    textAlign: 'center',
    fontSize: 25,
    color: Colors.white,
  },
  errorText: {
    color: Colors.red,
    marginHorizontal: 25,
    margin: 0,
  },
  editImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
    alignSelf: 'center',
    backgroundColor: Colors.red,
  },
});
