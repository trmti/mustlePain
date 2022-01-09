import './index.css';
import liff from '@line/liff';
import { db, getGroup } from './firebase';

document.getElementById('firestore').innerHTML = getGroup(db).then((value) => {
  return value[0].userIds[0];
});

document.addEventListener('DOMContentLoaded', function () {
  liff
    .init({ liffId: process.env.LIFF_ID })
    .then(() => {
      const isLoggedIn = liff.isLoggedIn();
      if (!isLoggedIn) {
        liff.login();
      }
    })
    .catch((error) => {
      console.log(error);
    });
});
