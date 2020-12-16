export interface LatLng {
  latitude: number
  longitude: number
}

export interface History {
  id: number
  storeId: number
  address: string
  latLng: LatLng
  createdAt: string
}
