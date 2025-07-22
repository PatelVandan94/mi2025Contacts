import {Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {Image} from 'react-native';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {
  updateContactDetails,
  deleteSpecificContact,
} from '../../utils/FireBaseServices';
import Strings from '../../utils/Strings';
import CreateContactSchema from '../../validation/createContactsSchema';
import {style} from './styles';
import {AppImages} from '../../../assests/images';

const ShowSpecificContact = ({route, navigation}: any) => {
  // const [data, setData] = useState({});
  const [createdDate, setCreatedDate] = useState('');
  const [updatedDate, setUpdatedDate] = useState('');
  const {id, obj} = route.params;

  const initialValues = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    mobileNumber: '',
    workNumber: '',
    homeNumber: '',
  };

  const showContact = async () => {
    try {
      // console.log(obj[0]);
      const arr = obj.name.split(' ');
      initialValues.firstName = arr[0];
      initialValues.lastName = arr.slice(1).join(' ');
      initialValues.phoneNumber = obj.numbers.phoneNumber;
      initialValues.mobileNumber = obj.numbers.mobileNumber;
      initialValues.homeNumber = obj.numbers.homeNumber;
      initialValues.workNumber = obj.numbers.workNumber;
      setCreatedDate(obj.createdDate);
      setUpdatedDate(obj.updatedDate);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    showContact();
  }, []);

  const editContact = async (values: any) => {
    try {
      Alert.alert(Strings.surityMessage, Strings.editSurityMessage, [
        {
          text: 'Yes',
          onPress: async () => {
            await updateContactDetails(
              id,
              values,
              createdDate,
              navigation,
              route.params.isOffline,
            );
            route.params.fetchAllContacts();
          },
        },
        {text: 'No'},
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteContact = async () => {
    try {
      Alert.alert(Strings.surityMessage, Strings.deleteSurityMessage, [
        {
          text: 'Yes',
          onPress: async () => {
            await deleteSpecificContact(id, navigation, route.params.isOffline);
            route.params.fetchAllContacts();
          },
        },
        {text: 'No'},
      ]);
    } catch (err) {
      console.log(err);
    }
  };
  const editProfileImage = () => {
    Alert.alert('Work In Progress');
  };
  return (
    <ScrollView>
      <View>
        <View style={style.flexRowContent}>
          <Text>
            {Strings.createDate}
            {createdDate}
          </Text>
          <Text>
            {Strings.updateDate}
            {updatedDate}
          </Text>
        </View>
        <View>
          <Image source={AppImages.defaultuser} style={style.profileImage} />
          <TouchableOpacity onPress={editProfileImage} style={style.editImage}>
            <Image source={AppImages.editimage} style={style.editImage} />
          </TouchableOpacity>
        </View>
        <Formik
          initialValues={initialValues}
          validationSchema={CreateContactSchema}
          onSubmit={editContact}>
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
                  onChangeText={handleChange('firstName')}
                />
                {errors.firstName ? (
                  <Text style={style.errorText}>{errors.firstName}</Text>
                ) : null}
                <TextInput
                  style={style.inputField}
                  value={lastName}
                  onChangeText={handleChange('lastName')}
                />
                {errors.lastName ? (
                  <Text style={style.errorText}>{errors.lastName}</Text>
                ) : null}
                <TextInput
                  style={style.inputField}
                  value={phoneNumber}
                  keyboardType="numeric"
                  onChangeText={handleChange('phoneNumber')}
                />
                {errors.phoneNumber ? (
                  <Text style={style.errorText}>{errors.phoneNumber}</Text>
                ) : null}
                <TextInput
                  style={style.inputField}
                  value={mobileNumber}
                  keyboardType="numeric"
                  onChangeText={handleChange('mobileNumber')}
                />
                {errors.mobileNumber ? (
                  <Text style={style.errorText}>{errors.mobileNumber}</Text>
                ) : null}
                <TextInput
                  style={style.inputField}
                  value={homeNumber}
                  keyboardType="numeric"
                  onChangeText={handleChange('homeNumber')}
                />
                {errors.homeNumber ? (
                  <Text style={style.errorText}>{errors.homeNumber}</Text>
                ) : null}
                <TextInput
                  style={style.inputField}
                  value={workNumber}
                  keyboardType="numeric"
                  onChangeText={handleChange('workNumber')}
                />
                {errors.workNumber ? (
                  <Text style={style.errorText}>{errors.workNumber}</Text>
                ) : null}
                <View style={style.flexRowContent}>
                  <TouchableOpacity
                    style={style.editButton}
                    onPress={() => handleSubmit()}>
                    <Text style={style.submitText}>{Strings.editContact}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={style.deleteButton}
                    onPress={deleteContact}>
                    <Text style={style.submitText}>
                      {Strings.deleteContact}
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            );
          }}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default ShowSpecificContact;
