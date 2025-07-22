import {StyleSheet} from 'react-native';
import Colors from '../../utils/Colors';

export const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 5,
    backgroundColor: Colors.white,
    marginVertical: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    marginVertical: 5,
  },
  headerTitle: {
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    fontSize: 30,
    color: Colors.black,
  },
  headerText: {
    color: Colors.black,
  },
  container: {
    flex: 1,
  },
  item: {
    height: 40,
    paddingTop: 12,
    paddingHorizontal: 10,
    backgroundColor: Colors.white,
    color: Colors.black,
  },
  searchInput: {
    backgroundColor: Colors.lightGrey,
    borderRadius: 30,
    paddingHorizontal: 15,
    fontSize: 15,
    paddingVertical: 8,
    marginTop: 10,
    marginBottom: 10,
  },
  sectionHeaderTextStyle: {
    paddingTop: 7,
    paddingHorizontal: 10,
    backgroundColor: Colors.lightGrey,
  },
  sidebarItemTextStyle: {
    padding: 2,
    color: Colors.black,
    textAlign: 'center',
  },
  sidebarContainerStyle: {
    width: 25,
    backgroundColor: Colors.lightGrey,
  },
  logoutBtn: {
    borderWidth: 1,
    borderColor: Colors.lightRed,
    alignSelf: 'flex-end',
    fontSize: 20,
    borderRadius: 20,
    paddingHorizontal: 25,
    paddingVertical: 8,
    color: Colors.lightRed,
  },
  addBtn: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    zIndex: 10,
  },
  addBtnImg: {
    height: 70,
    width: 70,
  },
});
