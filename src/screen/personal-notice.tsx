import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Divider, Layout } from '@ui-kitten/components'
import { TopNavBack } from 'components/top-nav'
import { observer } from 'mobx-react'
import { noticeStore } from 'stores/notice'
import { Notice } from 'models/notice'
import { navigation } from 'infra/navigation'
import { COLOR } from 'infra/color'

export const PersonalNoticeScreen = () => {
  useEffect(() => {
    noticeStore.fetchPersonalNotices()
  }, [])
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <TopNavBack title='맞춤알림' />
      <Layout style={{ flex: 1 }}>
        <PersonalNoticeList />
      </Layout>
    </SafeAreaView>
  )
}

const PersonalNoticeList = observer(() => {
  const [refreshing, setRefreshing] = useState(false)
  return (
    <FlatList
      refreshing={refreshing}
      onRefresh={async () => {
        await noticeStore.fetchPersonalNotices()
        setRefreshing(false)
      }}
      keyExtractor={(item) => item.id.toString()}
      data={noticeStore.personalNotices}
      renderItem={({ item }) => (
        <>
          <PersonalNoticeItem notice={item} />
          <Divider style={{ marginHorizontal: 20 }} />
        </>
      )}
    />
  )
})

const PersonalNoticeItem: React.FC<{ notice: Notice }> = ({ notice }) => (
  <TouchableOpacity
    style={{ paddingVertical: 12, paddingHorizontal: 20 }}
    onPress={() => {
      noticeStore.selectedPersonalNotice = notice
      //navigation.navigate('NoticeDetail')
    }}
  >
    <Text
      style={{
        fontSize: 14,
        fontWeight: 'bold',
        color: COLOR.dark,
        marginBottom: 10,
      }}
    >
      {notice.title}
    </Text>
    <Text
      style={{
        fontSize: 12,
        color: '#c4c4c4',
      }}
    >
      {notice.createdAt}
    </Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
})
