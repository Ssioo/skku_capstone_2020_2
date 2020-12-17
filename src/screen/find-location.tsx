import React, { useState } from 'react'
import NaverMapView from 'react-native-nmap'
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Layout } from '@ui-kitten/components'
import { TopNavBack } from 'components/top-nav'
import { WINDOW_HEIGHT } from 'infra/constant'
import { COLOR } from 'infra/color'
import { navigation } from 'infra/navigation'
import { LatLng } from 'models/history'
import { storeStore } from 'stores/store'

export const FindLocationScreen = () => {
  const [address, setAddress] = useState('')
  const [latLng, setLatLng] = useState<LatLng | null>(null)
  return (
    <Layout style={{ flex: 1 }}>
      <TopNavBack title='지도에서 매장찾기' />
      <View style={{ flex: 1 }}>
        <NaverMapView
          style={{ flex: 1 }}
          showsMyLocationButton
          zoomControl={false}
          onCameraChange={async (c) => {
            setLatLng({ latitude: c.latitude, longitude: c.longitude })
            try {
              const res = await fetch(
                `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=${c.longitude},${c.latitude}&orders=roadaddr,addr&output=json`,
                {
                  method: 'GET',
                  headers: {
                    'X-NCP-APIGW-API-KEY-ID': '6njqq9fv4e',
                    'X-NCP-APIGW-API-KEY':
                      'iYSgB2bzyHEq6Gr5I98AR1qyIlhnpVnL5yBs9UAa',
                  },
                },
              )
              const resJson = await res.json()
              console.log(JSON.stringify(resJson.results))
              setAddress(
                `${resJson.results[0]?.land?.name} ${resJson.results[0]?.land?.number1}`,
              )
            } catch (e) {}
          }}
        />
      </View>
      <Image
        source={require('../images/marker1.png')}
        style={styles.mapMarker}
      />
      <Text style={styles.addressContainer}>{address}</Text>
      <TouchableOpacity
        style={{
          position: 'absolute',
          alignSelf: 'center',
          bottom: 48,
          width: '90%',
          backgroundColor: COLOR.primary,
          paddingVertical: 16,
          borderRadius: 10,
          alignItems: 'center',
        }}
        onPress={() => {
          storeStore.newStoreAddress = address
          storeStore.newStoreLatLng = latLng
          navigation.goBack()
        }}
      >
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
          확인
        </Text>
      </TouchableOpacity>
    </Layout>
  )
}

const styles = StyleSheet.create({
  addressContainer: {
    position: 'absolute',
    alignSelf: 'center',
    width: '90%',
    height: 48,
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    paddingVertical: 12,
    paddingHorizontal: 20,
    top: 100,
    color: COLOR.dark,
    fontSize: 16,
    elevation: 2,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 8,
    shadowColor: 'rgba(0,0,0,0.16)',
    shadowOpacity: 1,
  },
  mapMarker: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    top: WINDOW_HEIGHT / 2,
    width: 40,
    height: 50,
    resizeMode: 'contain',
  },
})
