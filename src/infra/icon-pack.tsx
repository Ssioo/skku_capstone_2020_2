// @ts-nocheck
// https://akveo.github.io/react-native-ui-kitten/docs/guides/icon-packages#3rd-party-icon-packages

import React from 'react'
import { StyleSheet } from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

const genIconsMap = (IconComponent) => {
  return new Proxy(
    {},
    {
      get(target, name) {
        return {
          toReactElement: (props) => {
            const { height, tintColor, ...iconStyle } = StyleSheet.flatten(
              props.style,
            )
            return (
              <IconComponent
                name={name}
                size={height}
                color={tintColor}
                style={iconStyle}
              />
            )
          },
        }
      },
    },
  )
}

export const MaterialIconsPack = {
  name: 'material',
  icons: genIconsMap(MaterialIcon),
}

export const MaterialCommunityIconsPack = {
  name: 'material-comm',
  icons: genIconsMap(MaterialCommunityIcon),
}