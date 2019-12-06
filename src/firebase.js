import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDGK9KbKjgECEkRggZzMPRfgbcCSytWM5c',
  authDomain: 'headshotz-b626f.firebaseapp.com',
  databaseURL: 'https://headshotz-b626f.firebaseio.com',
  projectId: 'headshotz-b626f',
  storageBucket: 'headshotz-b626f.appspot.com',
  messagingSenderId: '347643097067',
  appId: '1:347643097067:web:6ed9c43b2e5c7fc2b833ae'
}

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig)

const getUserRefById = steamId =>
  app
    .firestore()
    .collection('users')
    .doc(steamId)

export async function saveUser({ user }) {
  if (!user) return
  try {
    const userRef = await getUserRefById(user.steamid)
    const userExists = (await userRef.get()).exists
    if (userExists) {
      userRef.update(user)
    } else {
      userRef.set(user)
    }
  } catch (e) {
    console.error('Error adding user: ', e)
  }
}
