import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Text, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { useState } from 'react'
import app from '../config/firebase'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { Link } from 'expo-router'

const Home = () => {
  const [email, setEMail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const auth = getAuth(app)

  const handleSubmit = () => {
    if (email.length === 0 && password.length === 0) return null
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!regex.test(email)) return null
    if (password.length < 6) return null
    if (password !== confirmPassword) return null

    createUserWithEmailAndPassword(auth, email, password)
      .then(value => { console.log('user created successfully: ', value.user.displayName) })
      .catch(error => { console.error(error) })
  }

  return (
    <SafeAreaView>
      <Text style={styles.title}>Ingresa en mi aplicacion</Text>
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
      <TextInput
        style={styles.input}
        placeholder='Password confirmation'
        onChangeText={setConfirmPassword}
      />
      <Button
        title='Home'
        onPress={handleSubmit}
      />
      <Link href='/' style={styles.link}>
        Go login
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
    color: 'blue'
  }
})

export default Home
