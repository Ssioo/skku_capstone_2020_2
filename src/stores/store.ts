import { action, computed, observable } from 'mobx'
import { Store } from 'models/store'
import { storeApi } from 'networks/store'
import { alert } from 'infra/util'
import { LatLng } from 'models/history'

class StoreStore {
  @observable stores: Store[] = []
  @observable discoveredStore: Store | null = null

  @observable newStoreAddress: string | null = null
  @observable newStoreLatLng: LatLng | null = null
  @observable myStore: Store | null = null

  @computed get visibleStoreUUIDs() {
    return this.stores.map((s) => s.uuid)
  }

  @action
  async fetchStores() {
    try {
      this.stores = await storeApi.getAllStores()
    } catch (e) {}
  }

  @action
  async registerStore(phone: string, pwd: string, name: string, uuid: string) {
    if (!this.newStoreLatLng || !this.newStoreAddress) return
    try {
      await storeApi.registerStore(
        phone,
        pwd,
        name,
        this.newStoreLatLng,
        this.newStoreAddress,
        uuid,
      )
      return await this.signInStore(phone, pwd)
    } catch (e) {
      alert(e)
    }
  }

  @action
  async signInStore(phone: string, pwd: string) {
    try {
      this.myStore = await storeApi.loginStore(phone, pwd)
      return true
    } catch (e) {
      alert(e)
    }
  }
}

export const storeStore = new StoreStore()
