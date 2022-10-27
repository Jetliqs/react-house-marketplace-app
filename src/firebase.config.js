// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDvC4kcIchlNytxTKIdo1MFqki-naqCOns',
  authDomain: 'react-house-marketplace-f9dcd.firebaseapp.com',
  projectId: 'react-house-marketplace-f9dcd',
  storageBucket: 'react-house-marketplace-f9dcd.appspot.com',
  messagingSenderId: '345534313377',
  appId: '1:345534313377:web:d333e4ce4f19041a53d1e0',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
