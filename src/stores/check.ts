import { action } from 'mobx'
import { alert } from 'infra/util'
import { userApi } from 'networks/user'

class CheckStore {
  @action
  async tryCheckIn(storeId: number, uuid: string) {
    try {
      return await userApi.checkIn(storeId, uuid)
    } catch (e) {
      alert(e)
    }
  }
}

export const checkStore = new CheckStore()
