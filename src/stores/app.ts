import { observable, reaction } from 'mobx'

class AppStore {
  @observable isLoading = false

}

export const appStore = new AppStore()
