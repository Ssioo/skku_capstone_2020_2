import { NavigationContainerRef } from '@react-navigation/core'
import { CommonActions, DrawerActions } from '@react-navigation/native'
import React from 'react'

// https://reactnavigation.org/docs/navigating-without-navigation-prop/#handling-initialization
let _isNavigationReady: boolean = false
export const setIsNavigationReady = (isReady: boolean) => {
  _isNavigationReady = isReady
}
export const _navigationRef = React.createRef<NavigationContainerRef>()

export const navigation = {
  navigate: (name: string, params?: object) => {
    if (!_isNavigationReady) return
    _navigationRef.current?.navigate(name, params)
  },
  openDrawer() {
    if (!_isNavigationReady) return
    _navigationRef.current?.dispatch(DrawerActions.openDrawer())
  },
  closeDrawer() {
    if (!_isNavigationReady) return
    _navigationRef.current?.dispatch(DrawerActions.closeDrawer())
  },
  setRoot(name: string) {
    if (!_isNavigationReady) return
    _navigationRef.current?.dispatch(
      CommonActions.reset({
        index: 0,
        // @ts-ignore
        routes: [{ name }],
      }),
    )
  },
  goBack() {
    if (!_isNavigationReady) return
    _navigationRef.current?.goBack()
  },
}
