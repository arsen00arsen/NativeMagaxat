import {useEffect, useState} from 'react';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useGetNotifications = async () => {
  let PusherClient;
  const [echo, setEcho] = useState({});
  Pusher.logToConsole = false;
  const getToken = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      PusherClient = new Pusher('f3410ab18dff50208018', {
        appId: 'FS852Lt2GV',
        key: 'f3410ab18dff50208018',
        secret: '823ca29599dcd73c1b28',
        cluster: 'mt1',
        disableStats: true,
        encrypted: true,
        wsHost: 'magaxat.com',
        authEndpoint: 'https://magaxat.com/broadcasting/auth',
        enabledTransports: ['ws', 'wss'],
        wsPort: '443',
        forceTLS: true,
        auth: {
          headers: {
            Authorization: 'Bearer ' + token,
            Accept: 'application/json',
          },
        },
      });
      setEcho(new Echo({
        broadcaster: 'pusher',
        client: PusherClient ?? undefined,
      }))
    }
};

  useEffect(() => {
    getToken();
  }, []);
  return {echo};
};
