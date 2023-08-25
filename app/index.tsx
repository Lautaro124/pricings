import { Button, Text, StyleSheet, SafeAreaView, View } from 'react-native'
import { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Input } from '@rneui/base'
import app from '../config/firebase'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { Link, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import * as Location from 'expo-location'
import { storeData } from '../config/storage'
import * as React from 'react'

const Home = () => {
  const [email, setEMail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [emailError, setEmailError] = useState<boolean>(false)
  const [passwordError, setPasswordError] = useState<boolean>(false)
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(false)

  const auth = getAuth(app)
  const router = useRouter()

  const getPermissions = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      alert('Permission to access location was denied, please try again')
      void getPermissions()
    }
  }

  useEffect(() => {
    void getPermissions()
  }, [])

  const handleSubmit = async () => {
    if (email.length === 0 && password.length === 0) return null
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!regex.test(email)) {
      setEmailError(true)
      return null
    }
    if (password.length < 6) {
      setPasswordError(true)
      return null
    }

    const { user } = await signInWithEmailAndPassword(auth, email, password)
    await storeData(user.email ?? 'example@example.com')
    router.push('/map')
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='dark' />
      <Text style={styles.title}>Welcome to my app</Text>
      <View style={styles.inputsContainer}>
        <Input
          label="Email"
          onChangeText={setEMail}
          rightIcon={<Icon name="email-outline" size={20} />}
          rightIconContainerStyle={{}}
          renderErrorMessage={emailError}
          errorMessage={emailError ? 'Your email is incorrect' : ''}
          placeholder="Write you email addres"
        />
        <Input
          errorMessage={passwordError ? 'Your password have less 6 letters' : ''}
          label="Password"
          onChangeText={setPassword}
          rightIcon={
            secureTextEntry
              ? <Icon name="eye-outline" size={20} onPress={() => { setSecureTextEntry(!secureTextEntry) }} />
              : <Icon name="eye-off-outline" size={20} onPress={() => { setSecureTextEntry(!secureTextEntry) }} />
          }
          rightIconContainerStyle={{}}
          renderErrorMessage={passwordError}
          secureTextEntry={secureTextEntry}
          placeholder="Write your password"
        />
      </View>
      <View>
        <Button
          title='Login'
          onPress={() => { void handleSubmit() }}
        />
        <Link href='/signup' style={styles.link}>
          Create account
        </Link>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 15,
    gap: 30
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold'
  },
  link: {
    padding: 10,
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline'
  },
  inputsContainer: {
    gap: 15
  }
})

export default Home
