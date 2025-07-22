import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  ListRenderItemInfo,
  SectionList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {removeToken} from '../../utils/TokenServices';
import {NavigationType} from '../../typings';
import SectionListSidebar from 'react-native-sectionlist-sidebar';
import {
  goToOnline,
  showAllContacts,
  showSpecificContact,
} from '../../utils/FireBaseServices';
import {styles} from './styles';
import ContactNotFound from '../../components/ContactNotFound';
import Strings from '../../utils/Strings';
import NetInfo from '@react-native-community/netinfo';
import {AppImages} from '../../../assests/images';
import {Routes} from '../../utils/routes';

const Home = ({navigation}: NavigationType) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchList, setSearchList] = useState([]);
  const [userData, setUserData] = useState([]);
  const [isOffline, setOfflineStatus] = useState(false);

  const fetchAllContacts = async () => {
    try {
      const userlist = await showAllContacts();
      // console.log(userlist);
      const listdata = [];
      userlist.map(obj => {
        let flag = true;
        let name =
          obj.firstName.charAt(0).toUpperCase() +
          obj.firstName.slice(1) +
          ' ' +
          obj.lastName;
        if (listdata.length > 0) {
          listdata.map(storedObj => {
            if (storedObj.key === obj.firstName.charAt(0).toUpperCase()) {
              storedObj.data.push(name);
              storedObj.details.push({
                name,
                key: obj.id,
                numbers: {
                  homeNumber: obj.homeNumber,
                  workNumber: obj.workNumber,
                  mobileNumber: obj.mobileNumber,
                  phoneNumber: obj.phoneNumber,
                },
                createdDate: obj.createdDate,
                updatedDate: obj.updatedDate,
              });
              flag = false;
            }
          });
        }
        if (flag) {
          listdata.push({
            id: Math.random(),
            key: obj.firstName.charAt(0).toUpperCase(),
            title: obj.firstName.charAt(0).toUpperCase(),
            data: [name],
            details: [
              {
                name,
                key: obj.id,
                createdDate: obj.createdDate,
                updatedDate: obj.updatedDate,
                numbers: {
                  homeNumber: obj.homeNumber,
                  workNumber: obj.workNumber,
                  mobileNumber: obj.mobileNumber,
                  phoneNumber: obj.phoneNumber,
                },
              },
            ],
          });
        }
      });
      listdata.map(obj => {
        obj.data.sort((a, b) => {
          if (a > b) return 1;
          else return -1;
        });
      });
      listdata.sort((a, b) => {
        if (a.key > b.key) {
          return 1;
        }
        if (a.key < b.key) {
          return -1;
        }
        return 0;
      });
      setUserData(listdata);
      // console.log(userData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener(state => {
      const offline = !(state.isConnected && state.isInternetReachable);
      if (!offline) goToOnline();
      setOfflineStatus(offline);
    });
    fetchAllContacts();
    return () => removeNetInfoSubscription();
  }, []);

  const deleteToken = async () => {
    try {
      await removeToken('token');
      navigation.replace('Login');
    } catch (err) {
      console.log(err);
    }
  };

  const updateContact = async (id: string, obj) => {
    navigation.navigate(Routes.ShowSpecificContact, {
      id,
      obj,
      fetchAllContacts,
      isOffline,
    });
  };

  const handleLogout = () => {
    Alert.alert(Strings.logoutAlertTitle, Strings.logoutAlertMessage, [
      {
        text: Strings.yesBtn,
        onPress: deleteToken,
      },
      {
        text: Strings.noBtn,
      },
    ]);
  };

  const searchContact = (text: String) => {
    const list: any[] | ((prevState: never[]) => never[]) = [];
    userData.forEach(obj => {
      obj.data.forEach((item: string) => {
        if (item.toUpperCase().includes(text.toUpperCase())) {
          list.push(item);
        }
      });
    });
    setSearchList(list);
  };

  const renderItem = (item: ListRenderItemInfo<never>) => {
    return (
      <Text
        style={styles.item}
        onPress={() => {
          item.section.details.map((obj: {name: any; key: string}) => {
            if (obj.name === item.item) updateContact(obj.key, obj);
          });
        }}>
        {item.item}
      </Text>
    );
  };

  const renderFlatListItem = props => {
    return (
      <Text
        style={styles.item}
        onPress={() => {
          userData.forEach(obj => {
            if (props.item === obj.data[0]) {
              updateContact(obj.details[0].key, obj.details[0]);
            }
          });
        }}>
        {props.item}
      </Text>
    );
  };

  const handleOnChangeText = (text: React.SetStateAction<string>) => {
    setSearchTerm(text);
    searchContact(text);
  };

  const addContacts = () => {
    navigation.navigate(Routes.CreateContacts, {fetchAllContacts, isOffline});
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>
              {Strings.HomePageHeaderTitle}
            </Text>
          </View>
          <View>
            <TouchableOpacity onPress={handleLogout}>
              <Text style={styles.logoutBtn}>{Strings.logoutBtn}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            onChangeText={handleOnChangeText}
            value={searchTerm}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.addBtn} onPress={addContacts}>
        <Image style={styles.addBtnImg} source={AppImages.plus} />
      </TouchableOpacity>
      <View style={styles.container}>
        {searchTerm.length > 0 ? (
          <FlatList
            data={searchList}
            renderItem={renderFlatListItem}
            ListEmptyComponent={ContactNotFound}
          />
        ) : (
          <SectionListSidebar
            data={userData}
            renderItem={renderItem}
            itemHeight={40}
            sectionHeaderHeight={30}
            sectionHeaderTextStyle={styles.sectionHeaderTextStyle}
            sidebarItemTextStyle={styles.sidebarItemTextStyle}
            sidebarContainerStyle={styles.sidebarContainerStyle}
            sectionHeaderDataTextStyle={styles.headerText}
            ListEmptyComponent={ContactNotFound}
          />
        )}
      </View>
    </View>
  );
};

export default Home;
