import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

//const url = 'https://vardantravel.elbakyan.am/api';
const url = 'http://161.35.89.36/api/';

// const url = 'http://192.168.0.170:8088/api/';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};
export const $host = axios.create({
  baseURL: url,
  headers,
  withCredentials: true,
});

export const $authHost = axios.create({
  baseURL: url,
  headers,
  withCredentials: true,
});

$authHost.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    const language = (await AsyncStorage.getItem('user-language')) || 'hy';
    config.headers['X-LOCALIZATION'] = language;
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

const baseUrl2 = url;
export {baseUrl2};
