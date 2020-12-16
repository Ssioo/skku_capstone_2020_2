import { LatLng } from 'models/history'

export interface Store {
  id: number
  uuid: string
  address: string
  latLng: LatLng
}

export interface DiscoveredStore extends Store {
  distance: number
}
