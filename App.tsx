import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import * as eva from '@eva-design/eva'
import { NavigationContainer } from '@react-navigation/native'
import SplashScreen from 'react-native-splash-screen'
import { YellowBox } from 'react-native'
import {
  setIsNavigationReady,
  _navigationRef,
  navigation,
} from 'infra/navigation'
import { Toast } from 'components/toast'
import { Alert } from 'components/alert'
import { Confirm } from 'components/confirm'
import { LoadingIndicator } from 'components/loading-indicator'
import { isIOS, WARNING_WHITELIST } from 'infra/constant'
import { mapping, theme } from 'infra/theme'
import { RootDrawer } from 'navigators/drawer-stack'
import { CovidIconsPack } from 'infra/icons'
import { MaterialCommunityIconsPack, MaterialIconsPack } from 'infra/icon-pack'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import messaging from '@react-native-firebase/messaging'
import { userStore } from 'stores/user'
import PushNotification from 'react-native-push-notification'
import { appStore } from 'stores/app'
import { Push } from 'components/push'

export const App = () => {
  useEffect(() => {
    setIsNavigationReady(true)
    SplashScreen.hide()
    initFCM()
    const foregroundFCM = messaging().onMessage(async (message) => {
      console.log(message)
      Push.show(message.data?.title ?? '', message.data?.body ?? '')
      PushNotification.localNotification({
        channelId: 'covid',
        vibration: 500,
        ignoreInForeground: false,
        title: message.data?.title,
        message: message.data?.body,
      })
    })
    YellowBox.ignoreWarnings(WARNING_WHITELIST)
    return () => {
      foregroundFCM()
      setIsNavigationReady(false)
    }
  }, [])

  const initFCM = async () => {
    if (isIOS) {
      const requP = await messaging().requestPermission()
      const permission = [
        messaging.AuthorizationStatus.AUTHORIZED,
        messaging.AuthorizationStatus.PROVISIONAL,
      ].includes(requP)
    }
    await userStore.fetchUniqueIds()
  }

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
      <Push />
      <LoadingIndicator />
    </>
  )
}
