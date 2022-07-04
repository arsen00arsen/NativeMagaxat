import PushNotification from 'react-native-push-notification';

export const LocalNotification = async sms => {
  PushNotification.localNotification({
    channelId: 'test',
    autoCancel: true,
    title: sms.full_name,
    message: sms.text,
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
    allowWhileIdle: false,
  });
};
