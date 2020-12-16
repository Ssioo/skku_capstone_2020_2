import { BaseApi } from 'networks/base'
import { ApiError } from 'networks/error'
import { Store } from 'models/store'
import { LatLng } from 'models/history'

class StoreApi extends BaseApi {
  async getAllStores(): Promise<Store[]> {
    const res = await this.get('/stores')
    if (res.status !== 200) throw new ApiError(res)
    return res.data
  }

  async registerStore(id: string, pwd: string, name: string, latLng: LatLng) {
    const res = await this.post('/stores')
    if (res.status !== 200) throw new ApiError(res)
    return res.data
  }
}

export const storeApi = new StoreApi()
