import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const $host = axios.create({
  baseURL: 'https://sponsor.am/api',
  // baseURL: 'http://192.168.0.124/api',
  headers,
  withCredentials: true,
});

export const $authHost = axios.create({
  baseURL: 'https://sponsor.am/api',
  // baseURL: 'http://192.168.0.124/api',
  headers,
  withCredentials: true,
});

$authHost.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

$authHost.interceptors.response.use(
  config => {
    return config;
  },
  async error => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        await AsyncStorage.removeItem('token');
      } catch (e) {
        console.log('Unauthenticated');
      }
    }
    throw error;
  },
);

const baseUrl2 = 'https://sponsor.am/api';
// const baseUrl2 = 'http://192.168.0.124/api';
export {baseUrl2};
