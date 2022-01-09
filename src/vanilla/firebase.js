// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
} from 'firebase/firestore/lite';

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
export const db = getFirestore(app);

export async function getGroup(db) {
  const groupCol = collection(db, 'group');
  const groupSnapshot = await getDocs(groupCol);
  const groupList = groupSnapshot.docs.map((doc) => doc.data());
  return groupList;
}

export async function setTrainigDay(db, groupId, trainDayArray) {
  await setDoc(doc(db, 'group', groupId), {
    TrainingDay: trainDayArray,
  });
}

export async function setTrainingTime(db, groupId, trainTime) {
  await setDoc(doc(db, 'group', groupId), {
    TrainTime: trainTime,
  });
}
