/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import { ApplicationProvider } from '@ui-kitten/components'
import * as eva from '@eva-design/eva'
import { NavigationContainer } from '@react-navigation/native'
import { RootStack } from 'navigators/root-stack'
import { _navigationRef, setIsNavigationReady } from 'infra/navigation'
import { Toast } from 'components/toast'
import { Alert } from 'components/alert'
import { LoadingIndicator } from 'components/loading-indicator'
import { Confirm } from 'components/confirm'
import { WARNING_WHITELIST } from 'infra/constant'
import SplashScreen from 'react-native-splash-screen'
import { YellowBox } from 'react-native'
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
