// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KET,
  authDomain: 'pricings-73615.firebaseapp.com',
  projectId: 'pricings-73615',
  storageBucket: 'pricings-73615.appspot.com',
  messagingSenderId: '30568940723',
  appId: process.env.EXPO_PUBLIC_APP_ID,
  measurementId: 'G-PN4FY5120B'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export default app
