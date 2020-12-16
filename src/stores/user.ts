import { action, observable } from 'mobx'
import {getPhoneNumber, getUniqueId} from 'react-native-device-info'
import messaging from '@react-native-firebase/messaging'
import { alert } from 'infra/util'
import { userApi } from 'networks/user'
import { USER_SIGNED, storage } from 'infra/storage'

class UserStore {
  @observable uniqueId: string | null = null
  @observable fcmToken: string | null = null
  @observable phone: string | null = null

  @action
  async fetchUniqueIds() {
    this.fcmToken = await messaging().getToken()
    this.uniqueId = getUniqueId()
    this.phone = await getPhoneNumber()
  }

  @action
  async trySign() {
    if (!this.fcmToken || !this.uniqueId) {
      await this.fetchUniqueIds()
      return
    }
    if (await storage.get(USER_SIGNED)) return true
    try {
      await userApi.sign(this.fcmToken, this.uniqueId, this.phone)
      await storage.set(USER_SIGNED, 'true')
      return true
    } catch (e) {
      alert(e)
    }
  }

  @action
  async tryLogout() {
    await storage.remove(USER_SIGNED)
  }
}

export const userStore = new UserStore()
