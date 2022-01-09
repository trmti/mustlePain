import './index.css';
import liff from '@line/liff';
import { db, getGroup } from './firebase';

getGroup(db).then((data) => {
  console.log(data[0]);
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
