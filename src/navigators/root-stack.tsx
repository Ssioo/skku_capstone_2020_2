import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack'
import { HomeScreen } from 'screen/home'
import React, { useEffect } from 'react'
import { IntroScreen } from 'screen/Intro'
import { HistoryScreen } from 'screen/history'
import { NoticeScreen } from 'screen/notice'
import { SettingsScreen } from 'screen/settings'
import { PersonalNoticeScreen } from 'screen/personal-notice'
import { NoticeDetailScreen } from 'screen/notice-detail'
import { StoreSignInScreen } from 'screen/store-signin'
import { FindLocationScreen } from 'screen/find-location'
import { StoreManageScreen } from 'screen/store-manage'

const Stack = createStackNavigator()
export const RootStack = () => {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        ...TransitionPresets.SlideFromRightIOS,
        headerShown: false,
      })}
    >
      <Stack.Screen name='Intro' component={IntroScreen} />
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='StoreSignIn' component={StoreSignInScreen} />
      <Stack.Screen name='StoreManage' component={StoreManageScreen} />
      <Stack.Screen name='FindLocation' component={FindLocationScreen} />
      <Stack.Screen name='History' component={HistoryScreen} />
      <Stack.Screen name='Notice' component={NoticeScreen} />
      <Stack.Screen name='NoticeDetail' component={NoticeDetailScreen} />
      <Stack.Screen name='PersonalNotice' component={PersonalNoticeScreen} />
      <Stack.Screen name='Settings' component={SettingsScreen} />
    </Stack.Navigator>
  )
}
