import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { TopNavBack } from 'components/top-nav'
import { Layout } from '@ui-kitten/components'
import { COLOR } from 'infra/color'
import { storeStore } from 'stores/store'
import 'react-native-get-random-values'
// @ts-ignore
import { v4 } from 'uuid'
import { navigation } from 'infra/navigation'
import { observer } from 'mobx-react'
import { toast } from 'infra/util'

export const StoreSignInScreen = () => {
  useEffect(() => {}, [])

  const [phone, setPhone] = useState('')
  const [pwd, setPwd] = useState('')
  const [name, setName] = useState('')
  const [bleUUID, setBleUUID] = useState(v4())
  const [isSignUp, setIsSignUp] = useState(false)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <TopNavBack title='사업장 로그인' />
      <Layout style={{ flex: 1, paddingVertical: 20 }}>
        <ScrollView keyboardDismissMode='interactive'>
          <Text style={styles.inputDesc}>매장 전화번호(아이디)</Text>
          <TextInput
            style={styles.input}
            keyboardType='default'
            value={phone}
            onChangeText={setPhone}
          />
          <Text style={styles.inputDesc}>비밀번호</Text>
          <TextInput
            style={styles.input}
            keyboardType='default'
            textContentType='password'
            value={pwd}
            onChangeText={setPwd}
          />
          {isSignUp && (
            <>
              <Text style={styles.inputDesc}>매장 이름</Text>
              <TextInput
                style={styles.input}
                keyboardType='default'
                textContentType='name'
                value={name}
                onChangeText={setName}
              />
              <AddressView />
              <Text style={styles.inputDesc}>고유 ID 생성</Text>
              <Text style={styles.input}>{bleUUID}</Text>
            </>
          )}
          {!isSignUp && (
            <TouchableOpacity
              style={{
                backgroundColor: COLOR.primary,
                paddingVertical: 12,
                paddingHorizontal: 16,
                marginHorizontal: 20,
                marginVertical: 20,
                alignItems: 'center',
                borderRadius: 10,
              }}
              onPress={async () => {
                const res = await storeStore.signInStore(phone, pwd)
                if (res) {
                  toast('환영합니다.')
                  navigation.setRoot('StoreManage')
                }
              }}
            >
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>
                로그인
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={{
              paddingVertical: 12,
              paddingHorizontal: 16,
              marginHorizontal: 20,
              alignItems: 'center',
              borderRadius: 10,
              backgroundColor: isSignUp ? COLOR.primary : 'transparent',
            }}
            onPress={async () => {
              if (!isSignUp) {
                setIsSignUp(true)
              } else {
                const res = await storeStore.registerStore(
                  phone,
                  pwd,
                  name,
                  bleUUID,
                )
                if (res) {
                  toast(
                    '매장 등록이 성공하였습니다. 매장 관리 페이지로 이동합니다.',
                  )
                  navigation.setRoot('StoreManage')
                }
              }
            }}
          >
            <Text
              style={{
                color: isSignUp ? '#fff' : COLOR.primary,
                fontSize: 16,
                fontWeight: 'bold',
              }}
            >
              {isSignUp ? '등록하기' : '신규등록'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </Layout>
    </SafeAreaView>
  )
}

const AddressView = observer(() => (
  <>
    <Text style={styles.inputDesc}>매장 주소</Text>
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('FindLocation')
      }}
    >
      <Text style={styles.input}>{storeStore.newStoreAddress}</Text>
    </TouchableOpacity>
  </>
))

const styles = StyleSheet.create({
  inputDesc: {
    fontSize: 14,
    color: COLOR.primary,
    marginVertical: 8,
    marginHorizontal: 20,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#c4c4c4',
    fontSize: 14,
    color: '#333333',
    marginBottom: 20,
    marginHorizontal: 20,
  },
})
