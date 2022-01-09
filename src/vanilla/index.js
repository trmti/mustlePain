import './index.css';
import liff from '@line/liff';

document.addEventListener('DOMContentLoaded', function () {
  liff
    .init({ liffId: process.env.LIFF_ID })
    .then(() => {
      const userId = liff.getContext().userId;
      document.getElementById('user-id').innerText = userId;
    })
    .catch((error) => {
      console.log(error);
    });
});
