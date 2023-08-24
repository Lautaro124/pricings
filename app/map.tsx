import { StatusBar } from 'expo-status-bar'
import { StyleSheet, SafeAreaView } from 'react-native'
import MapView from 'react-native-maps'
import * as Location from 'expo-location'
import { useEffect, useState } from 'react'

const Mapp = () => {
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  })

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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='dark' />
      <MapView
        region={region}
        pointerEvents='auto'
        style={styles.mapView}
      />
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
