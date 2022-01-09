import './index.css';
import liff from '@line/liff';
import { db, setTrainDay, setTrainTime } from './firebase';

setTrainTime(db, 'test', '09:00');

document.getElementById('btn-submit').addEventListener('click', () => {
  console.log('ikko');
  const checkboxes = document.getElementsByClassName('trainingDay-checkbox');
  const groupId = liff.getContext().groupId;
  const trainDays = Array.from(checkboxes).filter(
    (checkbox) => checkbox.checked === true
  );
  setTrainDay(db, groupId, trainDays);
  setTrainTime(db, groupId, document.getElementById('input-time').value);
});

document.addEventListener('DOMContentLoaded', function () {
  liff
    .init({ liffId: process.env.LIFF_ID })
    .then(() => {
      const isLoggedIn = liff.isLoggedIn();
      if (!isLoggedIn) {
        liff.login();
      }
      console.log('logged in!!');
    })
    .catch((error) => {
      console.log(error);
    });
});
