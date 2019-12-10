"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveUser = saveUser;

var _app = _interopRequireDefault(require("firebase/app"));

require("firebase/firestore");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const firebaseConfig = {
  apiKey: 'AIzaSyDGK9KbKjgECEkRggZzMPRfgbcCSytWM5c',
  authDomain: 'headshotz-b626f.firebaseapp.com',
  databaseURL: 'https://headshotz-b626f.firebaseio.com',
  projectId: 'headshotz-b626f',
  storageBucket: 'headshotz-b626f.appspot.com',
  messagingSenderId: '347643097067',
  appId: '1:347643097067:web:6ed9c43b2e5c7fc2b833ae'
}; // Initialize Firebase

const app = _app.default.initializeApp(firebaseConfig);

const getUserRefById = steamId => app.firestore().collection('users').doc(steamId);

async function saveUser({
  user
}) {
  if (!user) return;

  try {
    const userRef = await getUserRefById(user.steamid);
    const userExists = (await userRef.get()).exists;

    if (userExists) {
      userRef.update(user);
    } else {
      userRef.set(user);
    }
  } catch (e) {
    console.error('Error adding user: ', e);
  }
}
//# sourceMappingURL=firebase.js.map