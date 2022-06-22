// import messaging from '@react-native-firebase/messaging';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';

// export async function requestUserPermission() {
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   GetFcmToken();
//   // if (enabled) {
//   //   // console.log('Authorization status:', authStatus);
//   // }
// }

// async function GetFcmToken() {
//   let fcmtoken = await AsyncStorage.getItem('token');
//   console.log(fcmtoken, 'old token');
//   if (!fcmtoken) {
//     try {
//       console.log(111111111111111111);
//       const fcmtoken = await messaging().getToken();
//       if (fcmtoken) {
//         console.log(fcmtoken, 'new token');
//         await AsyncStorage.setItem('token', fcmtoken);
//       }
//     } catch (error) {
//       console.log(error, 'error');
//     }
//   }
// }

// export const NotificationListner = () => {
//   messaging().onNotificationOpenedApp(remoteMessage => {
//     PushNotification.localNotification({
//       channelId: 'test-channel',
//       title: remoteMessage.notification.title,
//       message: remoteMessage.notification.body,
//     });
//     console.log(
//       'Notification caused app to open from background state:',
//       remoteMessage.notification,
//     );
//   });
//   messaging()
//     .getInitialNotification()
//     .then(remoteMessage => {
//       if (remoteMessage) {
//         PushNotification.localNotification({
//           channelId: 'test-channel',
//           title: remoteMessage.notification.title,
//           message: remoteMessage.notification.body,
//         });
//         console.log(
//           'Notification caused app to open from quit state:',
//           remoteMessage.notification,
//         );
//       }
//     });

//   messaging().onMessage(async remoteMessage => {
//     PushNotification.localNotification({
//       channelId: 'test-channel',
//       title: remoteMessage.notification.title,
//       message: remoteMessage.notification.body,
//     });
//     console.log('notification on frograund state ......', remoteMessage);
//   });
// };

export const LocalNotification = sms => {
  PushNotification.localNotification({
    channelId: 'test-channel',
    autoCancel: true,
    title: 'Local Notification Title',
    message: sms.text,
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
    actions: '["Yes", "No"]',
  });
};

export const DeleteReminder = id => {
  PushNotification.cancelLocalNotifications({id: '5'});
};
