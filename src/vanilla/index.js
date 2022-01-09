import './index.css';
import liff from '@line/liff';

document.addEventListener('DOMContentLoaded', function () {
  liff
    .init({ liffId: process.env.LIFF_ID })
    .then(() => {
      const userId = liff.getContext();
      console.log(userId);
      const isLoggedIn = liff.isLoggedIn();
      if (!isLoggedIn) {
        liff.login();
      }
      document.getElementById('userId').innerText = isLoggedIn
        ? 'true'
        : 'false';
    })
    .catch((error) => {
      console.log(error);
    });
});
