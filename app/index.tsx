import { Button, Text, StyleSheet, SafeAreaView } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { useState, useEffect } from 'react'
import app from '../config/firebase'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { Link, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import * as Location from 'expo-location'

const Home = () => {
  const [email, setEMail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
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

  const handleSubmit = () => {
    if (email.length === 0 && password.length === 0) return null
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!regex.test(email)) return null
    if (password.length < 6) return null

    void signInWithEmailAndPassword(auth, email, password)
      .then(value => {
        console.log(value.providerId)
        router.push('/map')
      })
      .catch(err => { console.log(err) })
  }

  return (
    <SafeAreaView>
      <StatusBar style='dark' />
      <Text style={styles.title}>Welcome to my app</Text>
      <TextInput
        style={styles.input}
        placeholder='Email'
        onChangeText={setEMail}
      />
      <TextInput
        style={styles.input}
        placeholder='Password'
        onChangeText={setPassword}
      />
      <Button
        title='Home'
        onPress={handleSubmit}
      />
      <Link href='/signup' style={styles.link}>
        Create account
      </Link>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold'
  },
  input: {
    height: 40,
    width: 'auto',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    fontSize: 16
  },
  link: {
    padding: 10,
    color: 'blue',
    textDecorationLine: 'underline'
  }
})

export default Home
