import { action, observable } from 'mobx'
import { DiscoveredStore, Store } from 'models/store'
import { storeApi } from 'networks/store'
import { alert } from 'infra/util'
import { LatLng } from 'models/history'

class StoreStore {
  @observable stores: Store[] = []
  @observable discoveredStore: DiscoveredStore | null = null

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
    latLng: LatLng,
    address: string,
    uuid: string,
  ) {
    try {
      return await storeApi.registerStore(id, pwd, name, latLng, address, uuid)
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
