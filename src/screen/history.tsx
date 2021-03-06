import React, { useEffect, useState } from 'react'
import { Layout } from '@ui-kitten/components'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { TopNavBack } from 'components/top-nav'
import NaverMapView, { Marker } from 'react-native-nmap'
import moment from 'moment'
import { COLOR } from 'infra/color'
import { ChevronLeft } from '@ui-kitten/components/ui/shared/chevronLeft.component'
import { ChevronRight } from '@ui-kitten/components/ui/shared/chevronRight.component'
import { userStore } from 'stores/user'
import { observer } from 'mobx-react'

export const HistoryScreen = () => {
  useEffect(() => {
    userStore.fetchHistory()
  }, [])
  return (
    <Layout style={{ flex: 1, backgroundColor: '#fff' }}>
      <TopNavBack title='내 기록' />
      <Layout style={{ flex: 1 }}>
        <MapView />
        <DateSelectButton />
      </Layout>
    </Layout>
  )
}

const MapView = observer(() => (
  <View style={{ flex: 1 }}>
    <NaverMapView
      style={{ flex: 1 }}
      onInitialized={() => {}}
      onCameraChange={() => {}}
      zoomControl={false}
      showsMyLocationButton
    >
      {userStore.history?.map((h) => (
        <Marker
          key={h.id}
          coordinate={{ ...h.latLng }}
          image={require('../images/marker1.png')}
          width={40}
          height={50}
        />
      ))}
    </NaverMapView>
  </View>
))

const DateSelectButton = () => {
  return (
    <View style={styles.dateContainer}>
      <TouchableOpacity
        hitSlop={{ left: 10, top: 10, bottom: 10, right: 10 }}
        onPress={() => {
          if (userStore.selectedDate.isSame(moment().add(-28, 'day'), 'day'))
            return
          const newDate = userStore.selectedDate.add(-1, 'day')
          userStore.selectedDate = moment(newDate)
        }}
      >
        <ChevronLeft width={24} height={24} fill={COLOR.dark} />
      </TouchableOpacity>
      <Text
        style={{
          color: COLOR.dark,
          fontSize: 14,
          fontWeight: 'bold',
          marginHorizontal: 10,
        }}
      >
        {formatToday(userStore.selectedDate)}
      </Text>
      <TouchableOpacity
        hitSlop={{ left: 10, top: 10, bottom: 10, right: 10 }}
        onPress={() => {
          if (userStore.selectedDate.isSame(moment(), 'day')) return
          const newDate = userStore.selectedDate.add(1, 'day')
          userStore.selectedDate = moment(newDate)
        }}
      >
        <ChevronRight width={24} height={24} fill={COLOR.dark} />
      </TouchableOpacity>
    </View>
  )
}

const formatToday = (date: moment.Moment) => {
  if (date.isSame(moment(), 'day')) {
    return date.format('M월 D일') + ' (오늘)'
  } else if (date.isSame(moment().add(-1, 'day'), 'day')) {
    return date.format('M월 D일') + ' (어제)'
  } else if (date.isSame(moment().add(-2, 'day'), 'day')) {
    return date.format('M월 D일') + ' (그제)'
  } else {
    return date.format('M월 D일') + ' (' + moment().diff(date, 'day') + '일 전)'
  }
}

const styles = StyleSheet.create({
  dateContainer: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 2,
    shadowOpacity: 1,
    shadowColor: 'rgba(0,0,0,0.16)',
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: 'center',
    top: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
})
