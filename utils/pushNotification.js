// import PushNotification from 'react-native-push-notification';

// export const LocalNotification = async sms => {
//   PushNotification.localNotification({
//     channelId: 'test',
//     autoCancel: true,
//     title: sms.full_name,
//     message: sms.text,
//     vibrate: true,
//     vibration: 300,
//     playSound: true,
//     soundName: 'default',
//     allowWhileIdle: false,
//   });
// };
import PushNotificationIOS from '@react-native-community/push-notification-ios';
export const LocalNotification = async sms => {
  // const messagecount = useSelector(state => state?.messages?.messageCount);
  console.log(sms, 'smsmsm');
  PushNotificationIOS.presentLocalNotification({
    alertTitle: sms.full_name,
    alertBody: sms.text,
    // applicationIconBadgeNumber: messagecount,
    // soundName: 'default',
  });
};
