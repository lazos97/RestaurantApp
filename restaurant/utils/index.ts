import AsyncStorage from '@react-native-async-storage/async-storage'

let token
export const APP_URL = 'http://192.168.1.8:3000/api/v1'

export const retrieveToken = async () => {
  if (token) return token
  const savedToken = await AsyncStorage.getItem('token')
  return savedToken
}

export const saveToken = async (token: string) => {
  token = token
  await AsyncStorage.setItem('token', token)
}

export const removeToken = async () =>
  await AsyncStorage.removeItem('token')
