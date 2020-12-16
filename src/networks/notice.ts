import { BaseApi } from 'networks/base'
import { ApiError } from 'networks/error'
import { Notice } from 'models/notice'

class NoticeApi extends BaseApi {
  async getNotices(): Promise<Notice[]> {
    return [
      {
        id: 1,
        title: 'Notice1',
        content: 'NoticeContent1',
        createdAt: '2020-12-11',
      },
      {
        id: 2,
        title: 'Notice2',
        content: 'NoticeContent2',
        createdAt: '2020-12-11',
      },
    ]
    /*const res = await this.get('/notices')
    if (res.status !== 200) throw new ApiError(res)
    return res.data*/
  }
}

export const noticeApi = new NoticeApi()
