import {StyleSheet} from 'react-native';
import Colors from '../../utils/Colors';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  signupTextStyle: {
    flex: 2,
    textAlign: 'center',
    fontWeight: 'bold',
    color: Colors.black,
    fontSize: 40,
    justifyContent: 'center',
    marginTop: '10%',
  },
  inputField: {
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 20,
    padding: 10,
    color: Colors.black,
    alignContent: 'center',
    margin: 25,
    marginTop: 0,
    marginBottom: 5,
  },

  textStyle: {
    fontSize: 20,
    marginTop: 5,
    marginBottom: 0,
    margin: 25,
    color: Colors.black,
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
  boldLogIn: {
    fontWeight: 'bold',
  },
  buttonConatiner: {
    flex: 2,
  },
  inputFieldFlex: {
    flex: 10,
  },
  errorText: {
    color: Colors.red,
    marginHorizontal: 25,
  },
  forgotPassButton: {
    backgroundColor: Colors.grey,
    marginHorizontal: 25,
    borderRadius: 10,
  },
});
