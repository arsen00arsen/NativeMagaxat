import messaging from '@react-native-firebase/messaging';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission({
    sound: true,
    announcement: true,
  });
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    getFcmToken();
  }
}

const getFcmToken = async () => {
  //   let fcmToken = await AsyncStorage.getItem('fcmToken');
  //   if (!fcmToken) {
  //     try {
  let fcmToken = await messaging().getToken();
  console.log(fcmToken, 'fcmToken');
  //       if (fcmToken) {
  //         await AsyncStorage.setItem('fcmToken', fcmToken);
  //         () => requestUserPermission();
  //       }
  //     } catch (error) {
  //       console.log(error, 'err');
  //     }
  //   }
};
