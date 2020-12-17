/**
 * @format
 */

import { AppRegistry } from 'react-native'
import { App } from './App'
import React from 'react'
import { name as appName } from './app.json'
import messaging from '@react-native-firebase/messaging'
import PushNotificationIOS from '@react-native-community/push-notification-ios'
import PushNotification from 'react-native-push-notification'

messaging().setBackgroundMessageHandler(async (message) => {
  console.log(message)
})

PushNotification.configure({
  onRegister: (token) => {

  },
  onNotification: (noti) => {
    noti.finish(PushNotificationIOS.FetchResult.NoData)
  },
})

// enable codepush only in release
/*if (!__DEV__) {
  app = codePush({
    checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
    installMode: codePush.InstallMode.ON_NEXT_RESTART,
    mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,
  })(app)
}*/

const HeadlessCheck = ({ isHeadless }) => {
  if (isHeadless) return null
  return <App />
}

AppRegistry.registerComponent(appName, () => HeadlessCheck)
