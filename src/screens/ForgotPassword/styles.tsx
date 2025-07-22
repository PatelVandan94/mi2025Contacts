import {StyleSheet} from 'react-native';
import Colors from '../../utils/Colors';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 45,
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

  mailText: {
    marginTop: 15,
    marginBottom: 0,
    margin: 25,
    fontSize: 25,
    color: Colors.black,
  },
  resetButton: {
    backgroundColor: Colors.blue,
    borderRadius: 10,
    margin: 25,
    marginTop: 80,
    padding: 10,
    borderColor: Colors.white,
    borderWidth: 2,
  },
  resetText: {
    textAlign: 'center',
    fontSize: 25,
    color: Colors.white,
  },
  errorText: {
    color: Colors.red,
    marginHorizontal: 25,
  },
});
