const { utcToZonedTime } = require('date-fns-tz');
const { format } = require('date-fns');
const request = require('request');
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.sendReminder = functions
  .region('asia-northeast1')
  .pubsub.schedule('every 1 minutes')
  .timeZone('Asia/Tokyo')
  .onRun(async (context) => {
    // 秒を切り捨てた現在時刻;
    const now = (() => {
      let s = admin.firestore.Timestamp.now().seconds;
      s = s - (s % 60);
      return new admin.firestore.Timestamp(s, 0);
    })().toDate();
    const nowTime = format(utcToZonedTime(now, 'Asia/Tokyo'), 'HH:mm');
    const nowDate = format(utcToZonedTime(now, 'Asia/Tokyo'), 'eeee');
    const remindersRef = await admin
      .firestore()
      .collection('group')
      .where('TrainTime', '==', nowTime)
      .where('TrainingDay', 'array-contains', nowDate)
      .get();
    const remindedGroupIds = remindersRef.docs.map((doc) => doc.id);
    if (remindedGroupIds.length > 0) {
      request(
        {
          url: `https://line-chat-bot-ikko.herokuapp.com/group/notice/${remindedGroupIds}`,
          method: 'GET',
        },
        function (error, response, body) {
          console.log('メッセージ送信');
        }
      );
      console.log('リマインダー実行', remindedGroupIds);
      return 'リマインダーがあります';
    }

    console.log('Ikkodayo', now, nowTime, nowDate);
    return 'リマインダー通知処理終了';
  });
