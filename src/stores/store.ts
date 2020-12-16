import { action, observable } from 'mobx'
import { DiscoveredStore, Store } from 'models/store'
import { storeApi } from 'networks/store'

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
  async registerStore(id: string, pwd: string) {
    try {
    } catch (e) {}
  }

  @action
  async signInStore(id: string, pwd: string) {
    try {
    } catch (e) {}
  }
}

export const storeStore = new StoreStore()
