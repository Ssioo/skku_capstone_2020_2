import { SafeAreaView, StyleSheet, Text } from 'react-native'
import React from 'react'
import { Layout } from '@ui-kitten/components'
import { TopNavBack } from 'components/top-nav'

export const PersonalNoticeScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <TopNavBack title='맞춤알림' />
      <Layout style={{ flex: 1 }}>
        <Text>맞춤알림</Text>
      </Layout>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})
