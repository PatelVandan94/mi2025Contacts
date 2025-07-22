import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {style} from './styles';
import {Formik} from 'formik';
import {ResetEmailType, NavigationType} from '../../typings';
import {ResetPasswordEmail} from '../../utils/FireBaseServices';
import Strings from '../../utils/Strings';
import emailValidationSchema from '../../validation/resetEmailSchema';


const ForgotPassword = ({navigation}: NavigationType) => {
  const handleResetPassword = async (values: ResetEmailType) => {
    ResetPasswordEmail(values, navigation);
  };

  return (
    <View style={style.container}>
      <Formik
        initialValues={{email: ''}}
        validationSchema={emailValidationSchema}
        onSubmit={values => {
          handleResetPassword(values);
        }}>
        {({values, errors, handleSubmit, handleChange}) => {
          const {email} = values;
          return (
            <>
              <View>
                <Text style={style.mailText}>{Strings.email}</Text>
                <TextInput
                  autoCapitalize="none"
                  value={email}
                  placeholder="Enter Email"
                  style={style.inputField}
                  onChangeText={handleChange('email')}
                />
                {errors.email ? (
                  <Text style={style.errorText}>{errors.email}</Text>
                ) : null}
              </View>
              <View>
                <TouchableOpacity
                  style={style.resetButton}
                  onPress={() => handleSubmit()}>
                  <Text style={style.resetText}>{Strings.resetPassword}</Text>
                </TouchableOpacity>
              </View>
            </>
          );
        }}
      </Formik>
    </View>
  );
};

export default ForgotPassword;
