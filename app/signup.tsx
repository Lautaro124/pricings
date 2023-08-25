import { Button, Text, StyleSheet, SafeAreaView, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Input } from '@rneui/base'
import { useState } from 'react'
import app from '../config/firebase'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { Link, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { storeData } from '../config/storage'

const Home = () => {
  const [email, setEMail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [emailError, setEmailError] = useState<boolean>(false)
  const [passwordError, setPasswordError] = useState<boolean>(false)
  const [confirmPasswordError, setConfirmPasswordError] = useState<boolean>(false)
  const [secureTextEntryConfirmPassword, setSecureTextEntryConfirmPassword] = useState<boolean>(false)
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(false)
  const auth = getAuth(app)
  const router = useRouter()

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
    if (password !== confirmPassword) {
      setConfirmPasswordError(true)
      return null
    }

    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    await storeData(user.email ?? 'example@example.com')
    router.replace('/map')
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='dark' />
      <Text style={styles.title}>Register in my app</Text>
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
        <Input
          errorMessage={confirmPasswordError ? 'The passwords no are same' : ''}
          label="Confirm password"
          onChangeText={setConfirmPassword}
          rightIcon={
            secureTextEntryConfirmPassword
              ? <Icon name="eye-outline" size={20} onPress={() => { setSecureTextEntryConfirmPassword(!secureTextEntry) }} />
              : <Icon name="eye-off-outline" size={20} onPress={() => { setSecureTextEntryConfirmPassword(!secureTextEntry) }} />
          }
          rightIconContainerStyle={{}}
          renderErrorMessage={confirmPasswordError}
          secureTextEntry={secureTextEntryConfirmPassword}
          placeholder="Confirm your password"
        />
      </View>
      <View>
        <Button
          title='Register'
          onPress={() => { void handleSubmit() }}
        />
        <Link href='/' style={styles.link}>
          Go login
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
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline'
  },
  inputsContainer: {
    gap: 15
  }
})

export default Home
