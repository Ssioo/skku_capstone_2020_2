import { observable } from 'mobx'

class AppStore {
  @observable isLoading = false
}

export const appStore = new AppStore()
