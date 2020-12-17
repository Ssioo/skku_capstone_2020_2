import { BaseApi } from 'networks/base'
import { ApiError } from 'networks/error'

class UserApi extends BaseApi {
  async sign(token: string, uuid: string, os: 'ANDROID' | 'IOS') {
    const res = await this.post('/user/sign', { token, uuid, os })
    if (res.status !== 200 && res.status !== 201) throw new ApiError(res)
    return res.data
  }
  async getHistory() {
    const res = await this.get('/user/history')
    if (res.status !== 200) throw new ApiError(res)
    return res.data
  }

  async checkIn(storeId: number, uuid: string) {
    const res = await this.post(`/check/in/${storeId}`, {
      uuid,
    })
    if (res.status !== 200) throw new ApiError(res)
    return res.data
  }
}

export const userApi = new UserApi()
