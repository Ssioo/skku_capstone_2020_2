import React, { useEffect } from 'react'
import { SafeAreaView, Text } from 'react-native'
import { storeStore } from 'stores/store'
import BLEAdvertiser from 'react-native-ble-advertiser'
import { TopNavBack, TopNavHome } from 'components/top-nav'
import { Layout } from '@ui-kitten/components'
import { COLOR } from 'infra/color'

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
      <TopNavHome title='내 매장관리' />
      <Layout style={{ flex: 1 }}>
        <Text
          style={{
            alignSelf: 'center',
            marginTop: '20%',
            color: COLOR.dark,
            fontWeight: 'bold',
            fontSize: 18,
            textAlign: 'center',
          }}
        >
          BLE Advertising...
        </Text>
        <Text
          style={{
            alignSelf: 'center',
            marginTop: '20%',
            color: COLOR.dark,
            fontSize: 14,
            lineHeight: 24,
            textAlign: 'center',
          }}
        >
          매장명: {storeStore.myStore?.name}
          {'\n'}
          매장번호: {storeStore.myStore?.phone}
          {'\n'}
          UUID: {storeStore.myStore?.uuid}
        </Text>
        <Text
          style={{
            fontSize: 24,
            marginTop: 24,
            fontWeight: 'bold',
            color: COLOR.dark,
            textAlign: 'center',
          }}
        >
          금일 방문자수 {52}명
        </Text>
      </Layout>
    </SafeAreaView>
  )
}
