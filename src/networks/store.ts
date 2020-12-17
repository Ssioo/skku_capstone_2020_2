import { BaseApi } from 'networks/base'
import { ApiError } from 'networks/error'
import { Store } from 'models/store'
import { LatLng } from 'models/history'

class StoreApi extends BaseApi {
  async getAllStores(): Promise<Store[]> {
    const res = await this.get('/store')
    if (res.status !== 200) throw new ApiError(res)
    return res.data.map(
      (d) =>
        <Store>{
          id: d.id,
          name: d.name,
          latLng: {
            latitude: d.latitude,
            longitude: d.longitude,
          },
          uuid: d.uuid,
          phone: d.phone,
        },
    )
  }

  async registerStore(
    phone: string,
    pwd: string,
    name: string,
    latLng: LatLng,
    address: string,
    uuid: string,
  ) {
    const res = await this.post('/store/register', {
      phone,
      pwd,
      name,
      latLng,
      address,
      uuid,
    })
    if (res.status !== 200) throw new ApiError(res)
    return res.data
  }

  async loginStore(phone: string, pwd: string) {
    const res = await this.post('/store/login', {
      phone,
      pwd,
    })
    if (res.status !== 200) throw new ApiError(res)
    return res.data
  }
}

export const storeApi = new StoreApi()
