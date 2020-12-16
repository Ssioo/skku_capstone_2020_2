import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TextInput } from 'react-native'
import { TopNavBack } from 'components/top-nav'
import { Layout } from '@ui-kitten/components'
import { COLOR } from 'infra/color'

export const StoreManageScreen = () => {
  useEffect(() => {}, [])

  const [id, setId] = useState('')
  const [pwd, setPwd] = useState('')

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <TopNavBack title='사업장 로그인' />
      <Layout style={{ flex: 1 }}>
        <Text style={styles.inputDesc}>아이디</Text>
        <TextInput
          style={styles.input}
          keyboardType='default'
          value={id}
          onChangeText={setId}
        />
        <Text style={styles.inputDesc}>비밀번호</Text>
        <TextInput
          style={styles.input}
          keyboardType='default'
          textContentType='password'
          value={pwd}
          onChangeText={setPwd}
        />
      </Layout>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  inputDesc: {
    fontSize: 12,
    color: COLOR.primary,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#c4c4c4',
    fontSize: 14,
    color: '#333333',
  },
})
