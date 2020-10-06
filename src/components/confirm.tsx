import { COLOR } from 'infra/color'
import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { MODAL_MIDDLE_WIDTH } from 'infra/dimensions'
import { theme } from 'infra/theme'

export class Confirm extends React.Component<any, any> {
  static instance: Confirm

  constructor(props: any) {
    super(props)
    this.state = {
      visible: false,
      content: null,
      okay: null,
      onOkay: null,
      cancel: null,
      onCancel: null,
      onBackdropPress: null,
    }
    Confirm.instance = this
    this._hide = this._hide.bind(this)
  }

  static show(
    content: string,
    okay: string,
    onOkay: () => void,
    cancel?: string,
    onCancel?: () => void,
    onBackdropPress?: () => void,
  ) {
    Confirm.instance._show(
      content,
      okay,
      onOkay,
      cancel,
      onCancel,
      onBackdropPress,
    )
  }

  _show(
    content: string,
    okay?: string,
    onOkay?: () => void,
    cancel?: string,
    onCancel?: () => void,
    onBackdropPress?: () => void,
  ) {
    this.setState({
      visible: true,
      content,
      okay,
      onOkay,
      cancel,
      onCancel,
      onBackdropPress,
    })
  }

  _hide() {
    this.setState({
      visible: false,
      content: null,
      okay: null,
      onOkay: null,
      cancel: null,
      onCancel: null,
      onBackdropPress: null,
    })
  }

  render() {
    const {
      visible,
      content,
      okay,
      onOkay,
      cancel,
      onCancel,
      onBackdropPress,
    } = this.state
    return (
      visible && (
        <View style={styles.layout}>
          <TouchableWithoutFeedback
            onPress={() => {
              onBackdropPress?.()
              this._hide()
            }}
          >
            <View style={styles.backdrop} />
          </TouchableWithoutFeedback>
          <View style={styles.alertBox}>
            <Text style={styles.titleText}>{'알림'}</Text>
            <Text style={styles.contentText}>{content}</Text>
            <View style={styles.divider} />
            <View
              style={{
                flexDirection: 'row',
              }}
            >
              <TouchableOpacity
                style={styles.cancelButtonContainer}
                onPress={() => {
                  if (onCancel) onCancel()
                  this._hide()
                }}
              >
                <Text style={{ fontSize: 16 }}>{cancel || '취소'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.okButtonContainer}
                onPress={() => {
                  if (onOkay) onOkay()
                  this._hide()
                }}
              >
                <Text style={styles.buttonText}>{okay || '확인'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )
    )
  }
}

const borderRadius = 20

const styles = StyleSheet.create({
  layout: {
    position: 'absolute',
    zIndex: 10,
    width: '100%',
    height: '100%',
    backgroundColor: COLOR.backdrop,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    position: 'absolute',
    zIndex: 11,
    width: '100%',
    height: '100%',
  },
  alertBox: {
    position: 'absolute',
    zIndex: 12,
    width: MODAL_MIDDLE_WIDTH,
    borderRadius: borderRadius,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 30,
    paddingBottom: 11,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 20,
    paddingHorizontal: 18,
    paddingBottom: 24,
    textAlign: 'center',
  },
  divider: {
    borderBottomColor: 'rgba(0,0,0, 0.05)',
    borderBottomWidth: 1,
    alignSelf: 'stretch',
  },
  cancelButtonContainer: {
    flex: 1,
    height: 54,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: borderRadius,
    borderRightWidth: 1,
    borderColor: '#E8E8E8',
  },
  okButtonContainer: {
    flex: 1,
    height: 54,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomRightRadius: borderRadius,
  },
  buttonText: {
    color: theme['color-primary-500'],
    fontSize: 16,
  },
})
