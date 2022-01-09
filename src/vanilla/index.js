import './index.css';
import liff from '@line/liff';
import { db, setTrainDay, setTrainTime } from './firebase';

document.getElementById('btn-submit').addEventListener('click', () => {
  liff.closeWindow();
  checkboxes = document.getElementsByClassName('trainingDay-checkbox');
  const groupId = liff.getContext().groupId;
  const trainDays = checkboxes.map((checkbox) => checkbox.checked === true);
  setTrainDay(db, groupId, trainDays);
  setTrainTime(db, groupId, document.time.value);
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
