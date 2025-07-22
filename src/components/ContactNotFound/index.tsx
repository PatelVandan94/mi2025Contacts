import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './style';
import Strings from '../../utils/Strings';

const ContactNotFound = () => {
  return (
    <View style={styles.noContactsView}>
      <Text style={styles.noContactMessage}>{Strings.noContacts}</Text>
    </View>
  );
};

export default ContactNotFound;
