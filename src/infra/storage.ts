import AsyncStorage from '@react-native-async-storage/async-storage'

export const USER_SIGNED: string = 'user.sign'

export const storage = {
  get: async (key: string) => {
    try {
      return await AsyncStorage.getItem(key)
    } catch (e) {
      console.log(e)
      return null
    }
  },
  set: async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) {
      console.log(e)
    }
  },
  remove: async (key: string) => {
    try {
      await AsyncStorage.removeItem(key)
    } catch (e) {
      console.log(e)
      throw e
    }
  },
}
