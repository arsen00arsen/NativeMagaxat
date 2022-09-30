import {useEffect, useState} from 'react';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useGetNotifications = () => {
  const [echoClient, setEchoClient] = useState(null);
  Pusher.logToConsole = false;
  useEffect(() => {
    getToken();
    return () => {
      setEchoClient({});
    };
  }, []);
  const getToken = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      const PusherClient = new Pusher('f3410ab18dff50208018', {
        appId: 'FS852Lt2GV',
        key: 'f3410ab18dff50208018',
        secret: '823ca29599dcd73c1b28',
        cluster: 'mt1',
        disableStats: true,
        encrypted: true,
        wsHost: 'sponsor.am',
        authEndpoint: 'https://sponsor.am/broadcasting/auth',
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
      if (!echoClient) {
        const echo = new Echo({
          broadcaster: 'pusher',
          client: PusherClient,
        });
        setEchoClient(echo);
      }
    }
  };

  return {echoClient};
};
