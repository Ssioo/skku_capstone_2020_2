import { TopNavigation, TopNavigationAction } from '@ui-kitten/components'
import { navigation } from 'infra/navigation'
import React from 'react'
import { BackIcon } from 'infra/icons'
import { Text, TouchableOpacity, View } from 'react-native'
import { COLOR } from 'infra/color'

export const TopNavBack: React.FC<{
  title?: string
}> = ({ title }) => (
  <View style={{ height: 48, width: '100%', alignItems: 'center' }}>
    <TouchableOpacity
      style={{ padding: 10, position: 'absolute', left: 10 }}
      onPress={() => navigation.goBack()}
    >
      <BackIcon style={{ width: 24, height: 24 }} />
    </TouchableOpacity>
    <Text
      style={{
        position: 'absolute',
        fontSize: 18,
        fontWeight: 'bold',
        color: COLOR.dark,
        alignSelf: 'center',
        justifyContent: 'center',
        lineHeight: 48,
      }}
    >
      {title}
    </Text>
  </View>
)
