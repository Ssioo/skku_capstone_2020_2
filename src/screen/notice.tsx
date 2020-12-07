import React, { useEffect, useState } from 'react'
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'
import { Divider, Layout } from '@ui-kitten/components'
import { TopNavBack } from 'components/top-nav'
import { observer } from 'mobx-react'
import { noticeStore } from 'stores/notice'
import { Notice } from 'models/Notice'
import { COLOR } from 'infra/color'
import { navigation } from 'infra/navigation'

export const NoticeScreen = () => {
  useEffect(() => {
    noticeStore.fetchNotices()
  }, [])
  return (
    <SafeAreaView style={styles.container}>
      <TopNavBack title='공지사항' />
      <NoticeList />
    </SafeAreaView>
  )
}

const NoticeList = observer(() => {
  const [refreshing, setRefreshing] = useState(false)
  return (
    <FlatList
      refreshing={refreshing}
      onRefresh={async () => {
        await noticeStore.fetchNotices()
        setRefreshing(false)
      }}
      keyExtractor={(item) => item.id.toString()}
      data={noticeStore.notices}
      renderItem={({ item }) => (
        <>
          <NoticeItem notice={item} />
          <Divider style={{ marginHorizontal: 20 }} />
        </>
      )}
    />
  )
})

const NoticeItem: React.FC<{ notice: Notice }> = ({ notice }) => (
  <TouchableOpacity
    style={{ paddingVertical: 12, paddingHorizontal: 20 }}
    onPress={() => {
      noticeStore.selectedNotice = notice
      navigation.navigate('NoticeDetail')
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
