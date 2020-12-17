import { Layout } from '@ui-kitten/components'
import {
  Image,
  SafeAreaView,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { navigation } from 'infra/navigation'
import { toast } from 'infra/util'
import { RefreshIcon } from 'infra/icons'
import { BleManager } from 'react-native-ble-plx'
import { storeStore } from 'stores/store'

export const HomeScreen = () => {
  useEffect(() => {
    const manager = initStores()
    return () => {
      manager.then((m) => {
        m?.stopDeviceScan()
        m?.destroy()
      })
    }
  }, [])

  const initStores = async (): Promise<BleManager | null> => {
    await storeStore.fetchStores()
    return initBleHandler()
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Layout
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      >
        <TouchableOpacity
          style={{ position: 'absolute', top: 20, left: 20, padding: 10 }}
          onPress={() => navigation.openDrawer()}
        >
          <Image
            source={require('../images/ic_menu.png')}
            style={{ width: 22, height: 22 }}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 16, color: '#333', marginBottom: 10 }}>
          현재 위치
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: '#333',
            marginBottom: '15%',
            fontWeight: 'bold',
          }}
        >
          근처 매장 없음
        </Text>
        <TouchableOpacity
          style={{
            width: '60%',
            aspectRatio: 1,
            backgroundColor: '#f2f2f2',
            borderRadius: 400,
            elevation: 2,
            shadowColor: 'rgba(0,0,0,0.16)',
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowRadius: 12,
            shadowOpacity: 1,
          }}
          onPress={() => {
            toast('체크인 되었습니다.')
          }}
        >
          <View
            style={{
              margin: 14,
              backgroundColor: '#fff',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 400,
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                fontSize: 44,
                fontWeight: 'bold',
                color: '#e5e5e5',
                includeFontPadding: false,
              }}
            >
              CHECK{'\n'}IN
            </Text>
          </View>
        </TouchableOpacity>
        <CurrentTimer style={{ marginTop: '15%' }} />
        <Text
          style={{
            position: 'absolute',
            bottom: 43,
            color: '#e2e2e2',
            fontSize: 12,
          }}
        >
          Powered by Sio. SKKU
        </Text>
        <BtnRefresh />
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 26,
            right: 20,
            paddingVertical: 8,
            paddingHorizontal: 12,
          }}
          onPress={() => {
            navigation.navigate('StoreSignIn')
          }}
        >
          <Text
            style={{
              color: '#333',
              fontSize: 14,
              fontWeight: 'bold',
            }}
          >
            사업장으로 계속하기
          </Text>
        </TouchableOpacity>
      </Layout>
    </SafeAreaView>
  )
}

const initBleHandler = (): BleManager | null => {
  try {
    const bleManager = new BleManager()
    bleManager.startDeviceScan(
      null,
      { allowDuplicates: true },
      (error, device) => {
        if (!error) console.log(device?.id)
        else {
          console.log(error)
        }
      },
    )
    return bleManager
  } catch (e) {
    return null
  }
}

const BtnRefresh = () => {
  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
        bottom: 43,
        right: 30,
        height: 48,
        width: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: '#fff',
        elevation: 2,
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowColor: 'rgba(0,0,0,0.16)',
        shadowOpacity: 1,
        shadowRadius: 12,
      }}
      onPress={async () => {
        await storeStore.fetchStores()
        initBleHandler()
        toast('Refreshed')
      }}
    >
      <RefreshIcon style={{ width: 16, height: 16 }} />
    </TouchableOpacity>
  )
}

const CurrentTimer: React.FC<{ style?: StyleProp<ViewStyle> }> = ({
  style,
}) => {
  const [currentTime, setCurrentTime] = useState(moment())
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(moment())
    }, 5000)
    return () => {
      clearInterval(timer)
    }
  }, [])
  return (
    <View style={style}>
      <Text
        style={{
          color: '#333',
          fontSize: 16,
          textAlign: 'center',
        }}
      >
        {currentTime.format('YYYY. MM. DD HH:mm A')}
      </Text>
    </View>
  )
}
