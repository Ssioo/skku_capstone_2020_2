import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack'
import { HomeScreen } from 'screen/home'
import React from 'react'

const Stack = createStackNavigator()
export const RootStack = () => (
  <Stack.Navigator
    screenOptions={() => ({
      ...TransitionPresets.SlideFromRightIOS,
      headerShown: false,
    })}
  >
    <Stack.Screen name='Home' component={HomeScreen} />
  </Stack.Navigator>
)
