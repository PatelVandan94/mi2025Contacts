import React from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './styles';
import {Formik} from 'formik';
import SignUpValidationSchema from '../../validation/signUpSchema';
import {NavigationType, InputTypes} from '../../typings';
import {signUpUser} from '../../utils/FireBaseServices';
import Strings from '../../utils/Strings';
const SignUpScreen = ({navigation}: NavigationType) => {
  const initialValues = {
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  const handleSignUp = async (values: InputTypes) => {
    await signUpUser(values, navigation);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.signupTextStyle}>{Strings.signUp}</Text>
      <Formik
        initialValues={initialValues}
        validationSchema={SignUpValidationSchema}
        onSubmit={handleSignUp}>
        {({values, errors, handleSubmit, handleChange}) => {
          const {userName, email, password, confirmPassword} = values;

          return (
            <ScrollView>
              <View style={styles.inputFieldFlex}>
                <View>
                  <Text style={styles.textStyle}>{Strings.userName}</Text>
                  <TextInput
                    style={styles.inputField}
                    value={userName}
                    autoCapitalize="none"
                    onChangeText={handleChange('userName')}
                  />
                  {errors.userName ? (
                    <Text style={styles.errorText}>{errors.userName}</Text>
                  ) : null}
                </View>
                <View>
                  <Text style={styles.textStyle}>{Strings.email}</Text>
                  <TextInput
                    keyboardType="email-address"
                    style={styles.inputField}
                    value={email}
                    onChangeText={handleChange('email')}
                  />
                  {errors.email ? (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  ) : null}
                </View>
                <View>
                  <Text style={styles.textStyle}>{Strings.password}</Text>
                  <TextInput
                    secureTextEntry={true}
                    style={styles.inputField}
                    value={password}
                    onChangeText={handleChange('password')}
                  />
                  {errors.password ? (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  ) : null}
                </View>
                <View>
                  <Text style={styles.textStyle}>
                    {Strings.confirmPassword}
                  </Text>
                  <TextInput
                    secureTextEntry={true}
                    style={styles.inputField}
                    value={confirmPassword}
                    onChangeText={handleChange('confirmPassword')}
                  />
                  {errors.confirmPassword ? (
                    <Text style={styles.errorText}>
                      {errors.confirmPassword}
                    </Text>
                  ) : null}
                </View>

                <View style={styles.buttonConatiner}>
                  <TouchableOpacity
                    style={styles.submitButton}
                    onPress={() => handleSubmit()}>
                    <Text style={styles.submitText}>
                      {Strings.createAccount}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          );
        }}
      </Formik>
    </View>
  );
};

export default SignUpScreen;
