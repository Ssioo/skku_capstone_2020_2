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
  }
}

export const userApi = new UserApi()
