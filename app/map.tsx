import { StatusBar } from 'expo-status-bar'
import { StyleSheet, SafeAreaView } from 'react-native'
import MapView from 'react-native-maps'

const Mapp = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='dark' />
      <MapView
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
