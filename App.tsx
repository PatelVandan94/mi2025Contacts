import React from 'react';
import Login from './src/screens/Login';
import {StyleSheet, View} from 'react-native';
import SignUpScreen from './src/screens/SignUp';
import ForgotPassword from './src/screens/ForgotPassword';
import ShowSpecificContact from './src/screens/ShowSpecificContact';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import CreateUserContacts from './src/screens/CreateContacts';
import SplashScreen from './src/screens/SplashScreen';
import {Routes} from './src/utils/routes';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <View style={style.mainContainer}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name={Routes.SplashScreen} component={SplashScreen} />
          <Stack.Screen name={Routes.Login} component={Login} />
          <Stack.Screen name={Routes.Signup} component={SignUpScreen} />
          <Stack.Screen name={Routes.Home} component={Home} />
          <Stack.Screen
            name={Routes.ForgotPassword}
            component={ForgotPassword}
          />
          <Stack.Screen
            name={Routes.CreateContacts}
            component={CreateUserContacts}
          />
          <Stack.Screen
            name={Routes.ShowSpecificContact}
            component={ShowSpecificContact}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

const style = StyleSheet.create({
  mainContainer: {flex: 1},
});

export default App;
