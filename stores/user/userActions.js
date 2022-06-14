import AsyncStorage from '@react-native-async-storage/async-storage';
import UserService from '../../http/authService/authService';

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

export const loginUser = (email, password) => async dispatch => {
  try {
    dispatch(startLogin());
    const {data} = await UserService.login({email, password});
    dispatch(loginSuccess(data.data));
    await AsyncStorage.setItem('token', data.token);
  } catch (error) {
    console.log(error);
    dispatch(loginError(error.message));
  }
};

export const registerUser = dataToSend => async dispatch => {
  try {
    dispatch(startLogin());
    const {data} = await UserService.register(dataToSend);
    dispatch(loginSuccess(data.data));
    await AsyncStorage.setItem('token', data.token);
  } catch (error) {
    console.log(error);
    dispatch(loginError(error.message));
  }
};

export const userPhotoChange = imgUpload => async dispatch => {
  try {
    await dispatch(
      userInfoChange({
        name: imgUpload.name,
        email: imgUpload.email,
        image: imgUpload.image,
        lastname: imgUpload.lastname,
        type: imgUpload.type,
      }),
    );
  } catch (error) {
    console.log(error);
    dispatch(loginError(error.message));
  }
};

export const getMe = () => async dispatch => {
  try {
    dispatch(startLogin());
    const token = await AsyncStorage.getItem('token');
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
    await UserService.logout();
    await AsyncStorage.removeItem('token');
    dispatch(loginError('Logged out'));
  } catch (error) {
    dispatch(loginError(error.message));
  }
};
