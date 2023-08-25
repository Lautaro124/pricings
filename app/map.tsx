import { StatusBar } from 'expo-status-bar'
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import { getDatabase } from 'firebase/database'
import { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { getData } from '../config/storage'

interface MarkerType {
  latitude: number
  longitude: number
  isDraggable: boolean
  title: string
  description: string
}

const Mapp = () => {
  const db = getDatabase()
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  })

  const [markers, setMarkers] = useState<MarkerType[]>([])

  const getLocation = async () => {
    const { coords } = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High })
    setRegion({
      latitude: coords.latitude,
      longitude: coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    })
  }

  useEffect(() => {
    void getLocation()
  }, [])

  const addMarkers = async () => {
    const mail = await getData()

    const newMarker = {
      isDraggable: true,
      latitude: region.latitude + 0.004922,
      longitude: region.longitude + 0.0004922,
      title: 'New Location',
      description: mail ?? 'example@example.com'
    }

    const newMarkersArray = markers.concat(newMarker)
    setMarkers(newMarkersArray)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { void addMarkers() }}>
          <Text >Add marker</Text>
          <Icon name="plus" size={20} />
        </TouchableOpacity>
      </View>
      <StatusBar style='dark' />
      <MapView
        region={region}
        style={styles.mapView}
      >
        <Marker
          title='Your location'
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude
          }}
        />
        {markers.map((marker, index) => (
          <Marker
            draggable={marker.isDraggable}
            key={index}
            title={marker.title}
            description={`By: ${marker.description}`}
            pinColor='blue'
            coordinate={
              {
                latitude: marker.latitude,
                longitude: marker.longitude
              }
            }
          />
        ))}
      </MapView>
    </SafeAreaView>
  )
}

export default Mapp

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  header: {
    top: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    height: 100
  },
  mapView: {
    width: '100%',
    height: '100%'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
})
