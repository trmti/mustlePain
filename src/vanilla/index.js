import './index.css';
import liff from '@line/liff';
import { db, getGroup } from './firebase';

const group = getGroup(db);
console.log(group);

document.addEventListener('DOMContentLoaded', function () {
  liff
    .init({ liffId: process.env.LIFF_ID })
    .then(() => {
      const isLoggedIn = liff.isLoggedIn();
      if (!isLoggedIn) {
        liff.login();
      }
      const userId = liff.getContext().userId;
      console.log(userId);
      document.getElementById('firestore').innerHTML = 'test';
    })
    .catch((error) => {
      console.log(error);
    });
});
