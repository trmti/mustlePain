import './index.css';
import liff from '@line/liff';
import { db, setTrainigDay, setTrainingTime } from './firebase';

document.getElementById('btn-submit').addEventListener('click', () => {
  checkboxes = document.getElementsByClassName('trainingDay-checkbox');
  const groupId = liff.getContext().groupId;
  const trainDays = checkboxes.map((checkbox) => checkbox.checked === true);
  setTrainigDay(db, groupId, trainDays);
  setTrainingTime(db, groupId, document.time.value);
  liff.closeWindow();
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
