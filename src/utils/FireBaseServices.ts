import auth, {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import {Alert} from 'react-native';
import storage from '@react-native-firebase/storage';
import Strings from '../../src/utils/Strings';
import {
  InputTypes,
  ResetEmailType,
  NavigationType,
  contactFields,
} from '../typings';
import {Routes} from './routes';
// const usersCollection = firestore().collection('Users');
// const userContacts = firestore().collection('Contacts');
const fireBaseAuth = firebase.auth();

export const signInUser = async (email: string, password: string) => {
  return await auth().signInWithEmailAndPassword(email, password);
};

export const signUpUser = async (
  values: InputTypes,
  navigation: NavigationType,
) => {
  try {
    const {userName, email, password} = values;
    const response = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    // const userId = response.user.uid;

    // await usersCollection.add({
    //   userId,
    //   userName,
    //   email,
    // });
    Alert.alert(Strings.navigateToLogin, Strings.signedUpSuccess, [
      {text: 'OK', onPress: () => navigation.navigate(Routes.Login)},
    ]);
    // const currentUser = fireBaseAuth.currentUser.uid;
  } catch (error: any) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        Alert.alert(Strings.emailAlreadyPresent);
        break;
      case 'auth/invalid-email':
        Alert.alert(Strings.emailNotFormatted);
        break;
      case 'auth/internal-error	':
        Alert.alert(Strings.internalError);
        break;
    }
  }
};

export const ResetPasswordEmail = async (
  values: ResetEmailType,
  navigation: NavigationType,
) => {
  const {email} = values;
  try {
    await fireBaseAuth.sendPasswordResetEmail(email);
    Alert.alert(Strings.navigateToLogin, Strings.mailSentSuccess, [
      {text: 'OK', onPress: () => navigation.navigate(Routes.Login)},
    ]);
  } catch (error: any) {
    switch (error.code) {
      case 'auth/invalid-email':
        Alert.alert(Strings.emailNotFormatted);
        break;
      case 'auth/user-not-found':
        Alert.alert(Strings.userNotFound);
        break;
      case 'auth/internal-error	':
        Alert.alert(Strings.internalError);
        break;
    }
  }
};

export const addContact = (
  values: contactFields,
  isOffline: boolean,
  uri: String,
  fileName: String,
) => {
  const currentUser = fireBaseAuth.currentUser?.uid;
  const createdDate = new Date().toLocaleDateString();
  const updatedDate = new Date().toLocaleDateString();
  const {
    firstName,
    lastName,
    phoneNumber,
    mobileNumber,
    workNumber,
    homeNumber,
  } = values;
  try {
    isOffline
      ? database()
          .goOffline()
          .then(async () => {
            database().ref(`/Contacts/${currentUser}/myContacts/`).push({
              firstName,
              lastName,
              phoneNumber,
              mobileNumber,
              workNumber,
              homeNumber,
              createdDate,
              updatedDate,
              uri,
            });
            const reference = storage().ref(fileName);
            await reference.putFile(uri);
          })
      : database()
          .goOnline()
          .then(async () => {
            database().ref(`/Contacts/${currentUser}/myContacts/`).push({
              firstName,
              lastName,
              phoneNumber,
              mobileNumber,
              workNumber,
              homeNumber,
              createdDate,
              updatedDate,
              uri,
            });
            const reference = storage().ref(fileName);
            await reference.putFile(uri);
          });
  } catch (err) {
    console.log(err);
  }
};

export const showAllContacts = async () => {
  try {
    const currentUser = fireBaseAuth.currentUser?.uid;
    const responseData = await database()
      .ref(`/Contacts/${auth().currentUser?.uid}/myContacts/`)
      .once('value');

    const arr = [];
    for (let key in responseData.val()) {
      arr.push({id: key, ...responseData.val()[key]});
    }
    return arr;
  } catch (err) {
    console.log(err);
  }
};

export const showSpecificContact = async (id: string) => {
  try {
    const currentUser = fireBaseAuth.currentUser?.uid;
    const data = await database()
      .ref(`/Contacts/${currentUser}/myContacts/${id}/`)
      .once('value');

    const response: any = data.val();
    // let uri1 = response.uri;
    // const fileName = uri1.substring(uri1.lastIndexOf('/') + 1);
    return response;
  } catch (err) {
    console.log(err);
  }
};

// export const uploadProfileImage = async () => {
//   const update = {
//     displayName: 'Alias',
//     photoURL: 'image.jpg',
//   };
//   const response = await fireBaseAuth.currentUser?.updateProfile(update);
//   console.log(response);
// };

export const updateContactDetails = async (
  id: string,
  values: any,
  createdDate: String,
  navigation: NavigationType,
  isOffline: boolean,
) => {
  const {
    firstName,
    lastName,
    phoneNumber,
    mobileNumber,
    homeNumber,
    workNumber,
  } = values;
  try {
    const updatedDate = new Date().toLocaleDateString();
    const currentUser = fireBaseAuth.currentUser?.uid;
    isOffline
      ? database()
          .goOffline()
          .then(async () => {
            Alert.alert(
              Strings.navigateToShowContacts,
              Strings.editSuccessMessage,
              [{text: 'Ok', onPress: () => navigation.replace(Routes.Home)}],
            );
            await database()
              .ref(`/Contacts/${currentUser}/myContacts/${id}/`)
              .set({
                firstName,
                lastName,
                phoneNumber,
                mobileNumber,
                homeNumber,
                workNumber,
                createdDate,
                updatedDate,
              });
          })
      : database()
          .goOnline()
          .then(async () => {
            Alert.alert(
              Strings.navigateToShowContacts,
              Strings.editSuccessMessage,
              [{text: 'Ok', onPress: () => navigation.replace('Home')}],
            );
            await database()
              .ref(`/Contacts/${currentUser}/myContacts/${id}/`)
              .set({
                firstName,
                lastName,
                phoneNumber,
                mobileNumber,
                homeNumber,
                workNumber,
                createdDate,
                updatedDate,
              });
          });
  } catch (err) {
    console.log(err);
  }
};

export const deleteSpecificContact = async (
  id: string,
  navigation: any,
  isOffline: boolean,
) => {
  try {
    const currentUser = fireBaseAuth.currentUser?.uid;
    const ref = database().ref(`/Contacts/${currentUser}/myContacts/${id}/`);
    isOffline
      ? database()
          .goOffline()
          .then(async () => {
            Alert.alert(
              Strings.navigateToShowContacts,
              Strings.deleteSuccessMessage,
              [
                {
                  text: 'Ok',
                  onPress: () => {
                    navigation.replace(Routes.Home);
                  },
                },
              ],
            );
            await ref.remove();
            navigation.replace(Routes.Home);
          })
      : database()
          .goOnline()
          .then(async () => {
            Alert.alert(
              Strings.navigateToShowContacts,
              Strings.deleteSuccessMessage,
              [
                {
                  text: 'Ok',
                  onPress: () => {
                    navigation.replace(Routes.Home);
                  },
                },
              ],
            );
            await ref.remove();
            navigation.replace(Routes.Home);
          });
  } catch (err) {
    console.log(err);
  }
};

export const goToOnline = () => {
  database().goOnline();
};
