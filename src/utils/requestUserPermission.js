import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission({
    sound: true,
    announcement: true,
  });
  // const enabled =
  //   authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //   authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  // if (enabled) {

  notificationListener();
  showLoacalNotifications();
  getFcmToken();
  // }
}

const getFcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log(fcmToken);
  if (!fcmToken) {
    try {
      fcmToken = await messaging().getToken();
      if (fcmToken) {
        await AsyncStorage.setItem('fcmToken', fcmToken);
      } else {
        subscribeToTokenRefresh();
      }
    } catch (error) {
      console.log(error, 'err');
    }
  }
};

const subscribeToTokenRefresh = () => {
  messaging().onTokenRefresh(async newFcmToken => {
    try {
      await AsyncStorage.setItem('fcmToken', newFcmToken);
    } catch (error) {
      console.log(error, 'err');
    }
  });
};
const showLoacalNotifications = () => {
  console.log(1111);
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(remoteMessage);
  });
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      console.log(remoteMessage);
    });
};
const notificationListener = () => {
  console.log(2222);
  messaging().onMessage(remoteMessage => {
    console.log(remoteMessage, 'rrrrr');
  });
};
requestUserPermission();
