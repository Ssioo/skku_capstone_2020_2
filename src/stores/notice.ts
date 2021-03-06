import { action, observable } from 'mobx'
import { alert } from 'infra/util'
import { noticeApi } from 'networks/notice'
import { Notice } from 'models/notice'

class NoticeStore {
  @observable notices: Notice[] = []
  @observable personalNotices: Notice[] = []
  @observable selectedNotice: Notice | null = null
  @observable selectedPersonalNotice: Notice | null = null

  @action
  async fetchNotices() {
    try {
      this.notices = await noticeApi.getNotices()
    } catch (e) {
      alert(e)
    }
  }

  @action
  async fetchPersonalNotices() {
    try {
      this.personalNotices = await noticeApi.getNotices()
    } catch (e) {
      alert(e)
    }
  }
}

export const noticeStore = new NoticeStore()
