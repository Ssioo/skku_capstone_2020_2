import React, { useEffect } from 'react'
import { SafeAreaView, Text } from 'react-native'
import { storeStore } from 'stores/store'
import BLEAdvertiser from 'react-native-ble-advertiser'

export const StoreManageScreen = () => {
  useEffect(() => {
    const uuid = storeStore.myStore?.uuid
    if (uuid) {
      BLEAdvertiser.setCompanyId(0x33)
      BLEAdvertiser.broadcast(uuid, [0, 0, 1, 1, 1], {
        connectable: false,
      })
        .then((res) => console.log('result', res))
        .catch((e) => console.log('err', e))
    }
    return () => {
      BLEAdvertiser.stopBroadcast()
    }
  }, [])
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Text>내 매장정보</Text>
    </SafeAreaView>
  )
}
