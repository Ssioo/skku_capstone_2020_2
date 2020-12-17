import { action, computed, observable } from 'mobx'
import { getUniqueId } from 'react-native-device-info'
import messaging from '@react-native-firebase/messaging'
import { alert } from 'infra/util'
import { userApi } from 'networks/user'
import { USER_SIGNED, storage } from 'infra/storage'
import { isIOS } from 'infra/constant'
import moment from 'moment'

class UserStore {
  @observable uniqueId: string | null = null
  @observable fcmToken: string | null = null
  @observable isSigned: string | null = null
  @observable history: any[] = []
  @observable selectedDate: moment.Moment = moment()

  @computed get historyOnSelectedDate() {
    return this.history.filter((h) =>
      moment(h.createdAt).isSame(this.selectedDate, 'd'),
    )
  }

  @action
  async fetchUniqueIds() {
    this.fcmToken = await messaging().getToken()
    this.uniqueId = getUniqueId()
    this.isSigned = await storage.get(USER_SIGNED)
    return this.isSigned
  }

  @action
  async trySign() {
    if (!this.fcmToken || !this.uniqueId) {
      await this.fetchUniqueIds()
      return
    }
    if (this.isSigned) return true
    try {
      await userApi.sign(
        this.fcmToken,
        this.uniqueId,
        isIOS ? 'IOS' : 'ANDROID',
      )
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

  @action
  async fetchHistory() {
    try {
      this.history = await userApi.getHistory()
    } catch (e) {
      alert(e)
    }
  }
}

export const userStore = new UserStore()
