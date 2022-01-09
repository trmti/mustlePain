import './index.css';
import liff from '@line/liff';
require.context(
  '.',
  true,
  /\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$/
);

document.addEventListener('DOMContentLoaded', function () {
  liff
    .init({ liffId: process.env.LIFF_ID })
    .then(() => {
      console.log('Success! you can do something with LIFF API here.');
    })
    .catch((error) => {
      console.log(error);
    });
});
