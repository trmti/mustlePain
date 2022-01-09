import './index.css';
import liff from '@line/liff';
import { db, setTrainDayAndTime } from './firebase';

document.getElementById('btn-submit').addEventListener('click', () => {
  const checkboxes = document.getElementsByClassName('trainingDay-checkbox');
  const groupId = liff.getContext().groupId;
  const trainDays = Array.from(checkboxes).filter(
    (checkbox) => checkbox.checked === true
  );
  setTrainDayAndTime(
    db,
    groupId,
    trainDays.map((trainDay) => trainDay.value),
    document.getElementById('input-time').value
  );
  document.getElementById('debug').innerText = groupId + ' ' + trainDays;
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
