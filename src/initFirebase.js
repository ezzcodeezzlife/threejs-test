// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCfgnY4CUreHhOteairX4ZfrKDaJxqqR2k',
  authDomain: 'dco2-90a14.firebaseapp.com',
  projectId: 'dco2-90a14',
  storageBucket: 'dco2-90a14.appspot.com',
  messagingSenderId: '506401655199',
  appId: '1:506401655199:web:91f8e30d23b3f88c9b15aa',
  measurementId: 'G-GYJPVFN2WM',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

console.log('firebase init..')
