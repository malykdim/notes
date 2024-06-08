import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBWr1aLrW_I2xNIfgMHwRTz86LZbjYMEdo',
  authDomain: 'notes-1748b.firebaseapp.com',
  projectId: 'notes-1748b',
  storageBucket: 'notes-1748b.appspot.com',
  messagingSenderId: '598154784852',
  appId: '1:598154784852:web:f7fe916975701fd20bbdc1'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth }