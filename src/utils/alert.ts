import {Alert} from 'react-native';
import {Strings} from './Strings';

export const alert = () => {
  Alert.alert(Strings.errorAlertTitle, Strings.inDevelopmentAlert, [
    {
      text: Strings.alertBtn,
    },
  ]);
};
