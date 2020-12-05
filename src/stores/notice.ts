import { action, observable } from 'mobx'
import { Notice } from 'models/Notice'
import { alert } from 'infra/util'
import { noticeApi } from 'networks/notice'

class NoticeStore {
  @observable notices: Notice[] = []
  @observable selectedNotice: Notice | null = null

  @action
  async fetchNotices() {
    try {
      this.notices = await noticeApi.getNotices()
    } catch (e) {
      alert(e.message)
    }
  }
}

export const noticeStore = new NoticeStore()
