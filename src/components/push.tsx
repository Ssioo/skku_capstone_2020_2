import React from 'react'
import { Animated, Easing, StyleSheet, Text, View } from 'react-native'
import { COLOR } from 'infra/color'
import { appStore } from 'stores/app'

const ANIMATION_DURATION = 150

export class Push extends React.Component<any, any> {
  static instance: Push
  opacity = new Animated.Value(0)
  timeout: NodeJS.Timeout | null = null

  constructor(props: any) {
    super(props)
    this.state = {
      visible: false,
      title: '',
      body: '',
    }
    Push.instance = this
  }

  static show(title: string, body: string, duration: number = 3000) {
    Push.instance._show(title, body, duration)
  }

  _show(title: string, body: string, duration: number) {
    if (this.timeout) clearTimeout(this.timeout)
    this.setState({ visible: true, title, body })
    Animated.timing(this.opacity, {
      toValue: 1,
      duration: ANIMATION_DURATION,
      easing: Easing.out(Easing.linear),
      useNativeDriver: true,
    }).start()
    setTimeout(() => {
      Animated.timing(this.opacity, {
        toValue: 0,
        duration: ANIMATION_DURATION,
        easing: Easing.out(Easing.linear),
        useNativeDriver: true,
      }).start()
      this.timeout = setTimeout(() => {
        this.setState({ visible: false, title: '', body: '' })
        this.timeout = null
      }, ANIMATION_DURATION)
    }, duration)
  }

  render() {
    const { visible, title, body } = this.state
    if (!visible) return null
    return (
      <>
        <Animated.View
          style={{
            opacity: this.opacity,
            width: '100%',
            position: 'absolute',
            height: '100%',
            flex: 1,
            top: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,0.38)',
          }}
        />
        <Animated.View style={[styles.layout, { opacity: this.opacity }]}>
          <Text
            style={{
              marginBottom: 10,
              color: COLOR.primary,
              fontWeight: 'bold',
              fontSize: 14,
            }}
          >
            {title}
          </Text>
          <Text style={{ color: COLOR.dark, fontSize: 14 }}>{body}</Text>
        </Animated.View>
      </>
    )
  }
}

const styles = StyleSheet.create({
  layout: {
    position: 'absolute',
    top: '8%',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 20,
  },
  toastText: {
    color: '#fff',
  },
})
