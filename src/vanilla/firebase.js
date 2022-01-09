import { collection, getDocs } from 'firebase/firestore/lite';

// Get a list of cities from your database
export default async function getCities(db) {
  const citiesCol = collection(db, 'group');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map((doc) => doc.data());
  return cityList;
}
