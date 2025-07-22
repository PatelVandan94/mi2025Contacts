import {StyleSheet} from 'react-native';
import Colors from '../../utils/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    margin: 18,
  },
  inputField: {
    borderWidth: 1,
    width: '100%',
    borderRadius: 10,
    fontSize: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    color: Colors.black,
  },
  inputLable: {
    fontSize: 20,
    color: Colors.black,
    marginVertical: 4,
  },
  inputView: {
    marginVertical: 8,
  },
  loginHeader: {
    fontSize: 60,
    fontWeight: 'bold',
    color: Colors.black,
    textAlign: 'center',
    marginVertical: 14,
  },
  submitBtn: {
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: Colors.blue,
  },
  btnTitle: {
    textAlign: 'center',
    fontSize: 24,
    color: Colors.white,
    padding: 10,
  },
  signupLinkLabel: {
    fontSize: 20,
    color: Colors.black,
    marginTop: 18,
    textAlign: 'center',
  },
  signupLink: {
    color: Colors.blue,
    fontWeight: 'bold',
  },
  linkHover: {
    textDecorationLine: 'line-through',
  },
  forgotPwd: {
    fontSize: 20,
    marginRight: 10,
    textAlign: 'right',
    color: Colors.blue,
    fontWeight: 'bold',
  },
  errorMessage: {
    color: Colors.red,
  },
});
