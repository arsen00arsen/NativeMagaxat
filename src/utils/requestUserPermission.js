import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

// export async function requestUserPermission() {
//   const authStatus = await messaging().requestPermission({
//     sound: true,
//     announcement: true,
//   });
//   console.log('2222.', authStatus);
//   // const enabled =
//   //   authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//   //   authStatus === messaging.AuthorizationStatus.PROVISIONAL;
//   // if (enabled) {
//   //   console.log(11111);
//   //   // getFcmToken();
//   // }
// }
export async function requestUserPermission() {
  const authorizationStatus = await messaging().requestPermission();

  if (authorizationStatus) {
    console.log('Permission status:', authorizationStatus);
  } else {
    console.log(11132665695);
  }
}
const getFcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log(fcmToken, 'pppp');
  if (!fcmToken) {
    try {
      fcmToken = await messaging().getToken();
      if (fcmToken) {
        await AsyncStorage.setItem('fcmToken', fcmToken);
        () => requestUserPermission();
      }
    } catch (error) {
      console.log('err', error);
    }
  }
};
