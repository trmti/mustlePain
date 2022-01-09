import './index.css';
import liff from '@line/liff';

document.addEventListener('DOMContentLoaded', function () {
  liff
    .init({ liffId: process.env.LIFF_ID })
    .then(() => {
      const userId = liff.getContext();
      console.log(userId);
      console.log(liff.isLoggedIn());
      document.getElementById('user-id').innerHTML = liff.isLoggedIn();
    })
    .catch((error) => {
      console.log(error);
    });
});
