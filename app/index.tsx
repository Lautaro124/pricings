import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Text, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { useState } from 'react'
import app from '../config/firebase'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'

const Home = () => {
  const [email, setEMail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const auth = getAuth(app)

  const handleSubmit = () => {
    if (email.length === 0 && password.length === 0) return null
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!regex.test(email)) return null
    if (password.length < 6) return null

    void signInWithEmailAndPassword(auth, email, password)
      .then(value => {
        console.log(value.providerId)
      })
      .catch(err => {
        console.log(err)
        if (err[0].includes('auth/user-not-found')) {
          createUserWithEmailAndPassword(auth, email, password)
            .then(value => { console.log('user created successfully: ', value.user.displayName) })
            .catch(error => { console.error(error) })
        }
      })
  }

  return (
    <SafeAreaView>
      <Text style={styles.title}>Ingresa en mi aplicacion</Text>
      <TextInput
        style={styles.input}
        placeholder='Email'
        placeholderTextColor='#fff'
        onChangeText={setEMail}
      />
      <TextInput
        style={styles.input}
        placeholder='Password'
        placeholderTextColor='#fff'
        onChangeText={setPassword}
      />
      <Button
        title='Home'
        onPress={handleSubmit}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
    color: '#fff'
  },
  input: {
    height: 40,
    width: 'auto',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    fontSize: 16,
    color: '#fff'
  }
})

export default Home
