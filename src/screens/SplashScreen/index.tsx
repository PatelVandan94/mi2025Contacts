import React, {useEffect} from 'react';
import {Image, View} from 'react-native';
import {getToken} from '../../utils/TokenServices';
import {styles} from './styles';
import {NavigationType} from '../../typings';
import {AppImages} from '../../../assests/images';
import {Routes} from '../../utils/routes';

const SplashScreen = ({navigation}: NavigationType) => {
  useEffect(() => {
    const timer = setTimeout(() => handleNavigation(), 2000);
    return () => {
      clearTimeout(timer);
    };
  });

  const handleNavigation = async () => {
    try {
      const token = await getToken('token');
      if (token) {
        navigation.replace(Routes.Home);
      } else {
        navigation.replace(Routes.Login);
      }
    } catch (err: any) {
      navigation.replace(Routes.Login);
    }
  };

  return (
    <View style={styles.main}>
      <Image style={styles.logo} source={AppImages.logo} />
    </View>
  );
};

export default SplashScreen;
