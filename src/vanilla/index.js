import './index.css';
import liff from '@line/liff';
import { db, setTrainDay, setTrainTime } from './firebase';

document.getElementById('btn-submit').addEventListener('click', () => {
  const checkboxes = document.getElementsByClassName('trainingDay-checkbox');
  const groupId = liff.getContext().groupId;
  const trainDays = Array.from(checkboxes).filter(
    (checkbox) => checkbox.checked === true
  );
  const trainDaysVal = trainDays.map((trainDay) => trainDay.value);
  const trainTime = document.getElementById('input-time').value;
  setTrainDay(db, groupId, trainDaysVal);
  setTrainTime(db, groupId, trainTime);
  liff
    .sendMessages([
      {
        type: 'text',
        text:
          '絶対に' +
          trainDaysVal.join(',') +
          'の' +
          trainTime +
          'から筋トレする！！',
      },
    ])
    .catch((err) => {
      console.log('error', err);
    });
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
      console.log('logged in!!');
    })
    .catch((error) => {
      console.log(error);
    });
});
