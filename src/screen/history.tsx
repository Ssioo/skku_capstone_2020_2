import React from 'react'
import { Layout } from '@ui-kitten/components'
import { SafeAreaView, Text } from 'react-native'
import { TopNavBack } from 'components/top-nav'

export const HistoryScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <TopNavBack title='내 기록' />
      <Layout style={{ flex: 1 }}>
        <Text>History</Text>
      </Layout>
    </SafeAreaView>
  )
}
