import { Dimensions, Platform } from 'react-native'

export const SERVER_BASE_URL = !__DEV__
  ? 'http://13.124.96.137:3000'
  : 'http://localhost:3000' // TODO: 왼쪽에 실서버 주소로 바꿔줘야함.

export const WINDOW_WIDTH = Dimensions.get('window').width
export const WINDOW_HEIGHT = Dimensions.get('window').height

export const isIOS = Platform.OS === 'ios'
export const isAOS = Platform.OS === 'android'

export const WARNING_WHITELIST = ['Calling bridge.imageLoader is deprecated']
