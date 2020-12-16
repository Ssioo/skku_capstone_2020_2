import React, { useEffect } from 'react'
import {
  DeviceEventEmitter,
  NativeEventEmitter,
  NativeModules,
  StatusBar,
} from 'react-native'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import * as eva from '@eva-design/eva'
import { NavigationContainer } from '@react-navigation/native'
import SplashScreen from 'react-native-splash-screen'
import { YellowBox } from 'react-native'
import { RootStack } from 'navigators/root-stack'
import { setIsNavigationReady, _navigationRef } from 'infra/navigation'
import { Toast } from 'components/toast'
import { Alert } from 'components/alert'
import { Confirm } from 'components/confirm'
import { LoadingIndicator } from 'components/loading-indicator'
import { WARNING_WHITELIST } from 'infra/constant'
import { mapping, theme } from 'infra/theme'
import { RootDrawer } from 'navigators/drawer-stack'
import { CovidIconsPack } from 'infra/icons'
import { MaterialCommunityIconsPack, MaterialIconsPack } from 'infra/icon-pack'
import { EvaIconsPack } from '@ui-kitten/eva-icons'

export const App = () => {
  useEffect(() => {
    setIsNavigationReady(true)
    SplashScreen.hide()
    YellowBox.ignoreWarnings(WARNING_WHITELIST)
    return () => {
      setIsNavigationReady(false)
    }
  }, [])

  return (
    <>
      <StatusBar barStyle='dark-content' />
      <IconRegistry
        icons={[
          CovidIconsPack,
          MaterialIconsPack,
          MaterialCommunityIconsPack,
          EvaIconsPack,
        ]}
      />
      <ApplicationProvider
        {...eva}
        theme={{ ...eva.light, ...theme }}
        customMapping={mapping}
      >
        <NavigationContainer ref={_navigationRef}>
          <RootDrawer />
        </NavigationContainer>
      </ApplicationProvider>
      <Toast />
      <Alert />
      <Confirm />
      <LoadingIndicator />
    </>
  )
}
