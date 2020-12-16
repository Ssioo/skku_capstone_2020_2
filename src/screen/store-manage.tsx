import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text, TextInput } from 'react-native'
import { TopNavBack } from 'components/top-nav'
import { Layout } from '@ui-kitten/components'

export const StoreManageScreen = () => {
  useEffect(() => {}, [])

  const [id, setId] = useState('')
  const [pwd, setPwd] = useState('')

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <TopNavBack title='사업장 로그인' />
      <Layout style={{ flex: 1 }}>
        <Text>아이디</Text>
        <TextInput keyboardType='default' value={id} onChangeText={setId} />
        <Text>비밀번호</Text>
        <TextInput
          keyboardType='default'
          textContentType='password'
          value={pwd}
          onChangeText={setPwd}
        />
      </Layout>
    </SafeAreaView>
  )
}
