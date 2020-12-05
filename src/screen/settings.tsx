import React from 'react'
import { Layout } from '@ui-kitten/components'
import { SafeAreaView, Text } from 'react-native'
import { TopNavBack } from 'components/top-nav'

export const SettingsScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <TopNavBack title='설정' />
      <Layout style={{ flex: 1 }}>
        <Text>Settings</Text>
      </Layout>
    </SafeAreaView>
  )
}
