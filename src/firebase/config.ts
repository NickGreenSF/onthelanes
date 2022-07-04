import { initializeApp } from 'firebase/app';
import * as fireBaseAuth from 'firebase/auth';
import { key } from './key';

const firebaseConfig = {
  apiKey: key,
  authDomain: 'onthelanes.firebaseapp.com',
  projectId: 'onthelanes',
  storageBucket: 'onthelanes.appspot.com',
  messagingSenderId: '517344571771',
  appId: '1:517344571771:web:aa609ee16a37d1c7624dde',
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export { fireBaseAuth };
