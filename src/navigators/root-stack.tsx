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
import { StoreManageScreen } from 'screen/store-manage'
import { observer } from 'mobx-react'
import { userStore } from 'stores/user'

const Stack = createStackNavigator()
export const RootStack = observer(() => {
  useEffect(() => {
    userStore.fetchUniqueIds().then(() => {
      userStore.trySign()
    })
  })
  return (
    <Stack.Navigator
      screenOptions={() => ({
        ...TransitionPresets.SlideFromRightIOS,
        headerShown: false,
      })}
    >
      <Stack.Screen name='Intro' component={IntroScreen} />
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='StoreManage' component={StoreManageScreen} />
      <Stack.Screen name='History' component={HistoryScreen} />
      <Stack.Screen name='Notice' component={NoticeScreen} />
      <Stack.Screen name='NoticeDetail' component={NoticeDetailScreen} />
      <Stack.Screen name='PersonalNotice' component={PersonalNoticeScreen} />
      <Stack.Screen name='Settings' component={SettingsScreen} />
    </Stack.Navigator>
  )
})
