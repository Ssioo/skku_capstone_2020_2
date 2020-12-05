import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer'
import { observer } from 'mobx-react'
import { useEffect } from 'react'
import { RootStack } from 'navigators/root-stack'
import { COLOR } from 'infra/color'
import { StyleSheet } from 'react-native'
import { navigation } from 'infra/navigation'
import React from 'react'

const Drawer = createDrawerNavigator()
export const RootDrawer = observer(() => {
  useEffect(() => {}, [])

  return (
    <Drawer.Navigator
      drawerStyle={{
        width: 270,
        overflow: 'hidden',
      }}
      drawerType='front'
      overlayColor={COLOR.backdrop}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name='HomeStack' component={RootStack} />
    </Drawer.Navigator>
  )
})

const DrawerContent = (props: any) => {
  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: '#f9f9f9' }}>
      <DrawerItem
        label='내 기록'
        inactiveTintColor={COLOR.dark}
        labelStyle={styles.txtDrawerItem}
        onPress={() => navigation.navigate('History')}
      />
      <DrawerItem
        label='맞춤알림'
        inactiveTintColor={COLOR.dark}
        labelStyle={styles.txtDrawerItem}
        onPress={() => navigation.navigate('PersonalNotice')}
      />
      <DrawerItem
        label='공지사항'
        inactiveTintColor={COLOR.dark}
        labelStyle={styles.txtDrawerItem}
        onPress={() => navigation.navigate('Notice')}
      />
      <DrawerItem
        label='설정'
        inactiveTintColor={COLOR.dark}
        labelStyle={styles.txtDrawerItem}
        onPress={() => navigation.navigate('Settings')}
      />
    </DrawerContentScrollView>
  )
}

const styles = StyleSheet.create({
  txtUserName: {
    fontSize: 24,
    color: COLOR.dark,
  },
  txtUserDesc: {
    fontSize: 18,
    color: COLOR.dark,
  },
  txtDrawerItem: {
    fontSize: 14,
    color: COLOR.dark,
  },
})
