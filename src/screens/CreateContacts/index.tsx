import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import Strings from '../../utils/Strings';
import {contactFields} from '../../typings';
import {style} from './styles';
import {addContact} from '../../utils/FireBaseServices';
import {Formik} from 'formik';
import CreateContactSchema from '../../validation/createContactsSchema';
import {launchImageLibrary} from 'react-native-image-picker';
import {AppImages} from '../../../assests/images';
import { Routes } from '../../utils/routes';

function CreateUserContacts({route, navigation}: any) {
  const [uri, setUri] = useState('');
  const [fileName, setFileName] = useState('');

  const initialValues = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    mobileNumber: '',
    workNumber: '',
    homeNumber: '',
  };
  const addUser = async (values: contactFields) => {
    try {
      await addContact(values, route.params.isOffline, uri, fileName);
      route.params.fetchAllContacts();
      navigation.navigate(Routes.Home);
    } catch (err) {
      console.log(err);
    }
  };
  const editProfileImage = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera',
          buttonNeutral: 'Ask me later',
          buttonNegative: 'cancel',
          buttonPositive: 'OK',
        },
      );
      console.log(granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera Permission Given');
        let data = await launchImageLibrary({
          selectionLimit: 1,
          mediaType: 'photo',
          includeBase64: false,
          quality: 1,
        });
        setUri(data.assets[0].uri);
        setFileName(data.assets[0].fileName);
        console.log(uri, ':uri\n', fileName);
      } else {
        console.log('You need to give up permissions');
      }
    } catch (err) {
      console.log(err);
    }
    // uploadProfileImage()
  };

  return (
    <ScrollView>
      <View>
        <View>
          <Image
            source={uri.length === 0 ? AppImages.defaultuser : {uri: uri}}
            style={style.profileImage}
          />
          <TouchableOpacity onPress={editProfileImage} style={style.editImage}>
            <Image source={AppImages.editimage} style={style.editImage} />
          </TouchableOpacity>
          <Formik
            initialValues={initialValues}
            validationSchema={CreateContactSchema}
            onSubmit={addUser}>
            {({values, errors, handleSubmit, handleChange}) => {
              const {
                firstName,
                lastName,
                phoneNumber,
                mobileNumber,
                workNumber,
                homeNumber,
              } = values;
              return (
                <>
                  <TextInput
                    style={style.inputField}
                    value={firstName}
                    placeholder="First Name"
                    onChangeText={handleChange('firstName')}
                  />
                  {errors.firstName ? (
                    <Text style={style.errorText}>{errors.firstName}</Text>
                  ) : null}
                  <TextInput
                    style={style.inputField}
                    value={lastName}
                    placeholder="Last Name"
                    onChangeText={handleChange('lastName')}
                  />
                  {errors.lastName ? (
                    <Text style={style.errorText}>{errors.lastName}</Text>
                  ) : null}
                  <TextInput
                    style={style.inputField}
                    value={phoneNumber}
                    keyboardType={'numeric'}
                    placeholder="Phone Number"
                    onChangeText={handleChange('phoneNumber')}
                    maxLength={10}
                  />
                  {errors.phoneNumber ? (
                    <Text style={style.errorText}>{errors.phoneNumber}</Text>
                  ) : null}
                  <TextInput
                    style={style.inputField}
                    value={mobileNumber}
                    keyboardType={'numeric'}
                    placeholder="Mobile Number"
                    onChangeText={handleChange('mobileNumber')}
                    maxLength={10}
                  />
                  {errors.mobileNumber ? (
                    <Text style={style.errorText}>{errors.mobileNumber}</Text>
                  ) : null}
                  <TextInput
                    style={style.inputField}
                    value={workNumber}
                    keyboardType={'numeric'}
                    placeholder="Work Number"
                    onChangeText={handleChange('workNumber')}
                    maxLength={10}
                  />
                  {errors.workNumber ? (
                    <Text style={style.errorText}>{errors.workNumber}</Text>
                  ) : null}
                  <TextInput
                    style={style.inputField}
                    value={homeNumber}
                    keyboardType={'numeric'}
                    placeholder="Home Number"
                    onChangeText={handleChange('homeNumber')}
                    maxLength={10}
                  />
                  {errors.homeNumber ? (
                    <Text style={style.errorText}>{errors.homeNumber}</Text>
                  ) : null}
                  <TouchableOpacity
                    style={style.submitButton}
                    onPress={() => handleSubmit()}>
                    <Text style={style.submitText}>{Strings.addContacts}</Text>
                  </TouchableOpacity>
                </>
              );
            }}
          </Formik>
        </View>
      </View>
    </ScrollView>
  );
}

export default CreateUserContacts;
