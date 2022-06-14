import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    GetFcmToken();
  }
}

async function GetFcmToken() {
  let fcmtoken = await AsyncStorage.getItem('token');
  console.log(fcmtoken, 'old token');
  if (!fcmtoken) {
    try {
      const fcmtoken = await messaging().getToken();
      if (fcmtoken) {
        console.log(fcmtoken, 'new token');
        await AsyncStorage.setItem('token', fcmtoken);
      }
    } catch (error) {
      console.log(error, 'error');
    }
  }
}

export const NotificationListner = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    PushNotification.localNotification({
      channelId: 'test-channel',
      title: remoteMessage.notification.title,
      message: remoteMessage.notification.body,
    });
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        PushNotification.localNotification({
          channelId: 'test-channel',
          title: remoteMessage.notification.title,
          message: remoteMessage.notification.body,
        });
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });

  messaging().onMessage(async remoteMessage => {
    PushNotification.localNotification({
      channelId: 'test-channel',
      title: remoteMessage.notification.title,
      message: remoteMessage.notification.body,
    });
    console.log('notification on frograund state ......', remoteMessage);
  });
};
