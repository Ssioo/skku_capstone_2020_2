import { Icon } from '@ui-kitten/components'
import React from 'react'
import { Image } from 'react-native'

const IconProvider = (source: any) => ({
  toReactElement: ({ animation, ...props }) => (
    <Image {...props} source={source} />
  ),
})

const genIcon = (
  name: string,
  pack: string = 'covid',
  defaultStyle: object = {},
) => (props: any) => {
  const style = Array.isArray(props.style)
    ? [defaultStyle, ...props.style]
    : [defaultStyle, props.style]

  return <Icon name={name} pack={pack} style={style} />
}

export const CovidIconsPack = {
  name: 'covid',
  icons: {
    back: IconProvider(require('../images/ic_back.png')),
    menu: IconProvider(require('../images/ic_menu.png')),
    refresh: IconProvider(require('../images/ic_refresh.png')),
  },
}

export const BackIcon = genIcon('back')
export const RefreshIcon = genIcon('refresh')
