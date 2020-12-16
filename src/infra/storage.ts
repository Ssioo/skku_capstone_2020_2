import AsyncStorage from '@react-native-async-storage/async-storage'

export type StorageKey = string

export const storage = {
  get: async (key: StorageKey) => {
    try {
      return await AsyncStorage.getItem(key)
    } catch (e) {
      console.log(e)
      return null
    }
  },
  set: async (key: StorageKey, value: string) => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) {
      console.log(e)
    }
  },
  remove: async (key: StorageKey) => {
    try {
      await AsyncStorage.removeItem(key)
    } catch (e) {
      console.log(e)
      throw e
    }
  },
}
