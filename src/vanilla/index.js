import './index.css';
import liff from '@line/liff';

document.addEventListener('DOMContentLoaded', function () {
  liff
    .init({ liffId: process.env.LIFF_ID })
    .then(() => {
      liff.login();
      const userId = liff.getContext();
      console.log(userId);
      const isLoggedIn = liff.isLoggedIn();
      console.log(isLoggedIn);
      document.getElementById('userId').innerText = isLoggedIn
        ? 'true'
        : 'false';
    })
    .catch((error) => {
      console.log(error);
    });
});
