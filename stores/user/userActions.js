import AsyncStorage from '@react-native-async-storage/async-storage';
import UserService from '../../src/http/Account/account';
import {Alert} from 'react-native';
export const startLogin = () => ({
  type: 'LOGIN_START',
});

export const loginError = payload => ({
  type: 'LOGIN_ERROR',
  payload,
});

export const loginSuccess = payload => ({
  type: 'LOGIN_SUCCESS',
  payload,
});

export const userInfoChange = payload => ({
  type: 'LOGIN_SUCCESS',
  payload,
});

export const loginUser = dateTosend => async dispatch => {
  try {
    dispatch(startLogin());
    const {data} = await UserService.login(dateTosend);
    await dispatch(loginSuccess(data.data.user));
    await AsyncStorage.setItem('token', data.data.token);
  } catch (error) {
    Alert.alert(error.response.data.message);
    dispatch(loginError());
  }
};

export const registerUser = dataToSend => async dispatch => {
  try {
    dispatch(startLogin());
    const {data} = await UserService.registre(dataToSend);
    await dispatch(loginSuccess(data.data.user));
    await AsyncStorage.setItem('token', data.data.token);
  } catch (error) {
    alert(error);
    dispatch(loginError(error.message));
  }
};

export const getMe = setUserToken => async dispatch => {
  try {
    dispatch(startLogin());
    const token = await AsyncStorage.getItem('token');
    setUserToken(token);
    if (token) {
      const {data} = await UserService.getMe();
      dispatch(loginSuccess(data.data));
    } else {
      dispatch(loginError('Unauthenticated'));
    }
  } catch (error) {
    dispatch(loginError(error.message));
  }
};

export const logoutUser = () => async dispatch => {
  try {
    dispatch(startLogin());
    // await UserService.logout();
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('USER_GUEST_TOKEN');
    dispatch(loginError('Logged out'));
  } catch (error) {
    dispatch(loginError(error.message));
  }
};

// export const remove = id => async dispatch => {
//   try {
//     dispatch(startLogin());
//     await UserService.deleteUser(id);
//     dispatch(loginError('Logged out'));
//     await AsyncStorage.removeItem('token');
//   } catch (error) {
//     dispatch(loginError(error.message));
//   } finally {
//   }
// };
