import { StyleSheet, Text, SafeAreaView } from 'react-native'
import React from 'react'

const Mapp = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcome}>
        Welcome to my mapp
      </Text>
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
