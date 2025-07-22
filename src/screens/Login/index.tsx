import React from 'react';
import {Text, TouchableOpacity, TextInput, View, Alert} from 'react-native';
import {Formik} from 'formik';
import {signInUser} from '../../utils/FireBaseServices';
import {addToken} from '../../utils/TokenServices';
import {userInputSchema} from '../../validation/UserInputSchema';
import {styles} from './styles';
import {LoginInputTypes, NavigationType} from '../../typings';
import Strings from '../../utils/Strings';
import {Routes} from '../../utils/routes';

const userInputInitialVal = {Email: '', Password: ''};
const Login = ({navigation}: NavigationType) => {
  const handleLogin = async (data: LoginInputTypes) => {
    try {
      const token = await signInUser(data.Email, data.Password);
      await addToken(token);
      navigation.replace(Routes.Home);
    } catch (err: any) {
      Alert.alert(Strings.errorAlertTitle, err.message.toString(), [
        {text: Strings.alertBtn},
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={userInputInitialVal}
        validationSchema={userInputSchema}
        onSubmit={values => handleLogin(values)}>
        {({values, errors, handleSubmit, handleChange}) => {
          const {Email, Password} = values;
          return (
            <>
              <Text style={styles.loginHeader}>{Strings.login}</Text>
              <View style={styles.inputView}>
                <Text style={styles.inputLable}>{Strings.email}</Text>
                <TextInput
                  style={styles.inputField}
                  onChangeText={handleChange('Email')}
                  value={Email}
                />
                {errors.Email ? (
                  <Text style={styles.errorMessage}>{errors.Email}</Text>
                ) : null}
              </View>
              <View style={styles.inputView}>
                <Text style={styles.inputLable}>{Strings.password}</Text>
                <TextInput
                  style={styles.inputField}
                  onChangeText={handleChange('Password')}
                  value={Password}
                  secureTextEntry
                />
                {errors.Password ? (
                  <Text style={styles.errorMessage}>{errors.Password}</Text>
                ) : null}
              </View>
              <View style={styles.inputView}>
                <Text
                  style={styles.forgotPwd}
                  onPress={() => navigation.navigate(Routes.ForgotPassword)}>
                  {Strings.forgotPassword}
                </Text>
                <Text style={styles.signupLinkLabel}>
                  {Strings.signUpLabel}
                  <Text
                    style={styles.signupLink}
                    onPress={() => navigation.navigate(Routes.Signup)}>
                    {Strings.signUpLink}
                  </Text>
                </Text>
              </View>
              <TouchableOpacity
                style={styles.submitBtn}
                onPress={() => handleSubmit()}>
                <Text style={styles.btnTitle}>{Strings.loginBtn}</Text>
              </TouchableOpacity>
            </>
          );
        }}
      </Formik>
    </View>
  );
};

export default Login;
