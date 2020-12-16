import { Alert } from 'components/alert'
import { Toast } from 'components/toast'
// @ts-ignore
import _isEqual from 'lodash.isequal'
import { useCallback, useState } from 'react'
import { Confirm } from 'components/confirm'

// https://github.com/mobxjs/mobx-react-lite/blob/master/src/utils.ts#L9
export function useForceUpdate() {
  const [, setTick] = useState(0)
  return useCallback(() => {
    setTick((tick) => tick + 1)
  }, [])
}

export const alert = Alert.show

export const confirm = Confirm.show

export const toast = Toast.show

export const isEqual = _isEqual

export const toastWip = () => {
  toast('아직 완성되지 않은 기능이에요')
}

