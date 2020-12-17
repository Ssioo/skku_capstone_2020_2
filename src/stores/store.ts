import { action, observable } from 'mobx'
import { DiscoveredStore, Store } from 'models/store'
import { storeApi } from 'networks/store'
import { alert } from 'infra/util'
import { LatLng } from 'models/history'

class StoreStore {
  @observable stores: Store[] = []
  @observable discoveredStore: DiscoveredStore | null = null

  @observable newStoreAddress: string | null = null
  @observable newStoreLatLng: LatLng | null = null

  @action
  async fetchStores() {
    try {
      this.stores = await storeApi.getAllStores()
    } catch (e) {}
  }

  @action
  async registerStore(
    id: string,
    pwd: string,
    name: string,
    uuid: string,
  ) {
    if (!this.newStoreLatLng || !this.newStoreAddress) return
    try {
      return await storeApi.registerStore(
        id,
        pwd,
        name,
        this.newStoreLatLng,
        this.newStoreAddress,
        uuid,
      )
    } catch (e) {
      alert(e)
    }
  }

  @action
  async signInStore(id: string, pwd: string) {
    try {
      return await storeApi.loginStore(id, pwd)
    } catch (e) {
      alert(e)
    }
  }
}

export const storeStore = new StoreStore()
