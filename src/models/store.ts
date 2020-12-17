import { LatLng } from 'models/history'

export interface Store {
  id: number
  phone: string
  name: string
  uuid: string
  address: string
  latLng: LatLng
}

export interface DiscoveredStore extends Store {
  distance: number
}
