import './index.css';
import liff from '@line/liff';

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
      document.getElementById('userId').innerText = userId;
    })
    .catch((error) => {
      console.log(error);
    });
});
