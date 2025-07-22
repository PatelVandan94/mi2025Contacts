import AsyncStorage from '@react-native-async-storage/async-storage';

export const addToken = async (token: any) => {
  await AsyncStorage.setItem('token', JSON.stringify(token.user));
};

export const getToken = async (token: string) => {
  return await AsyncStorage.getItem(token);
};
export const removeToken = async (token: string) => {
  return await AsyncStorage.removeItem(token);
};
