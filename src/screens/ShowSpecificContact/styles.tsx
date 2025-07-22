import {StyleSheet} from 'react-native';
import Colors from '../../utils/Colors';

export const style = StyleSheet.create({
  container: {flex: 1},
  inputField: {
    borderWidth: 1,
    borderRadius: 20,
    fontSize: 20,
    padding: 10,
    color: Colors.black,
    alignContent: 'center',
    margin: 25,
    marginBottom: 0,
  },
  editButton: {
    backgroundColor: Colors.blue,
    borderRadius: 50,
    height: 60,
    width: 200,
    marginTop: 30,
    padding: 10,
    marginBottom: 10,
    borderColor: Colors.white,
    borderWidth: 2,
  },
  deleteButton: {
    backgroundColor: Colors.blue,
    borderRadius: 50,
    height: 60,
    width: 200,
    marginTop: 30,
    padding: 10,
    marginBottom: 10,
    borderColor: Colors.white,
    borderWidth: 2,
  },
  submitText: {
    textAlign: 'center',
    fontSize: 25,
    color: 'white',
  },
  errorText: {
    color: Colors.red,
    marginHorizontal: 25,
    margin: 0,
  },
  profileImage: {
    width: 100,
    height: 100,
    margin: 15,
    borderRadius: 50,
    alignSelf: 'center',
  },
  editImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
    alignSelf: 'center',
    backgroundColor: Colors.red,
  },
  flexRowContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
