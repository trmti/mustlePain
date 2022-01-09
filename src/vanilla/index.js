import './index.css';
import liff from '@line/liff';
import { getCities } from 'firebase';

// Import the functions you need from the SDKs you need
import { initializeApp, getFirestore } from 'firebase/app';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBueIcHSC1gVW4Y3xYHEc0yIkZuQwW8TDU',
  authDomain: 'mustletrainapp.firebaseapp.com',
  projectId: 'mustletrainapp',
  storageBucket: 'mustletrainapp.appspot.com',
  messagingSenderId: '861876161031',
  appId: '1:861876161031:web:8c7c79a17dbdcc34e678a2',
  measurementId: 'G-GQYRYMZDJK',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', function () {
  liff
    .init({ liffId: process.env.LIFF_ID })
    .then(() => {
      const isLoggedIn = liff.isLoggedIn();
      if (!isLoggedIn) {
        liff.login();
      }
      const userId = liff.getContext().userId;
      document.getElementById('firestore').innerHTML = getCities(db);
    })
    .catch((error) => {
      console.log(error);
    });
});
