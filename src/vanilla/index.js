import './index.css';
import liff from '@line/liff';

document.addEventListener('DOMContentLoaded', function () {
  liff
    .init({ liffId: process.env.LIFF_ID })
    .then(() => {
      const userId = liff.getContext();
      console.log(userId);
      const idLoggedIn = liff.isLoggedIn();
      console.log(idLoggedIn);
      document.getElementById('user-id').innerText = isLoggedIn;
    })
    .catch((error) => {
      console.log(error);
    });
});
