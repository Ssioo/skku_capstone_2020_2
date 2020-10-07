import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import { ApplicationProvider } from '@ui-kitten/components'
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
      <ApplicationProvider
        {...eva}
        theme={{ ...eva.light, ...theme }}
        customMapping={mapping}
      >
        <NavigationContainer ref={_navigationRef}>
          <RootStack />
        </NavigationContainer>
      </ApplicationProvider>
      <Toast />
      <Alert />
      <Confirm />
      <LoadingIndicator />
    </>
  )
}
