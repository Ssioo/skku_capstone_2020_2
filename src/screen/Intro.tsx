import { Layout } from '@ui-kitten/components'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLOR } from 'infra/color'
import { navigation } from 'infra/navigation'
import { userStore } from 'stores/user'

export const IntroScreen = () => {
  return (
    <Layout style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: COLOR.primary,
          width: '100%',
          flex: 2,
          alignItems: 'center',
        }}
      >
        <Image
          source={require('../images/ic_check_white.png')}
          style={{
            width: 55,
            height: 55,
            resizeMode: 'contain',
            marginTop: 120,
          }}
        />
        <Text
          style={{
            color: '#fff',
            fontSize: 18,
            fontWeight: 'bold',
            marginTop: 45,
          }}
        >
          간편하게 체크인하기
        </Text>
        <Text
          style={{
            color: '#fff',
            fontSize: 14,
            marginTop: 54,
            textAlign: 'center',
            lineHeight: 24,
          }}
        >
          불필요한 QR코드 없이{'\n'}매장에 편리하게 방문하세요
        </Text>
      </View>
      <View style={styles.viewBottom}>
        <Text style={styles.desc}>
          최초 1회 동의 후, 제휴된 매장에 방문시{'\n'}자동으로 출입기록이
          암호화되어 저장됩니다.
        </Text>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={async () => {
            const res = await userStore.trySign()
            if (res) navigation.setRoot('Home')
          }}
        >
          <Text style={styles.btnText}>동의하고 계속하기</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  )
}

const styles = StyleSheet.create({
  viewBottom: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 38,
    paddingHorizontal: '5%',
  },
  desc: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  btnContainer: {
    borderRadius: 10,
    backgroundColor: COLOR.primary,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 43,
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
})
