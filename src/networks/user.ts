import { BaseApi } from 'networks/base'
import { ApiError } from 'networks/error'

class UserApi extends BaseApi {
  async sign(token: string, uuid: string, phone: string | null) {
    const res = await this.post('/user', { token, uuid, phone })
    if (res.status !== 200 && res.status !== 201) throw new ApiError(res)
    return res.data
  }

  async getHistory() {
    const res = await this.get('/user/history')
    if (res.status !== 200) throw new ApiError(res)
    return res.data
  }

  async checkIn(storeId: number) {
    const res = await this.post(`/check/in/${storeId}`, {

    })
  }
}

export const userApi = new UserApi()