import { storeMe } from '../constants/key'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const storeData = async (value: string) => {
  try {
    await AsyncStorage.setItem(storeMe, value)
  } catch (e) {
    throw new Error('Error')
  }
}

export const getData = async () => {
  try {
    const value = await AsyncStorage.getItem(storeMe)
    if (value !== null) {
      return value
    }
  } catch (e) {
    throw new Error('Error')
  }
}
