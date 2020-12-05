import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import { noticeStore } from 'stores/notice'
import { SafeAreaView, Text } from 'react-native'
import { TopNavBack } from 'components/top-nav'
import { Layout } from '@ui-kitten/components'

export const NoticeDetailScreen = observer(() => {
  useEffect(() => {
    return () => {
      noticeStore.selectedNotice = null
    }
  })
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <TopNavBack title='공지사항' />
      <Layout>
        <Text>{noticeStore.selectedNotice?.title}</Text>
        <Text>{noticeStore.selectedNotice?.createdAt}</Text>
        <Text>{noticeStore.selectedNotice?.content}</Text>

        </Layout>
    </SafeAreaView>

})
