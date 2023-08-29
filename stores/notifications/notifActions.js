// import {Alert} from 'react-native';
// import PostService from '../../src/http/Post/post';
// export const startFetch = () => ({
//   type: 'NOTIF_START',
// });

// export const fetchError = payload => ({
//   type: 'NOTIF_ERROR',
//   payload,
// });

// export const fetchSuccess = payload => ({
//   type: 'NOTIF_SUCCESS',
//   payload,
// });

// export const getNotifications = () => async dispatch => {
//   try {
//     // dispatch(startFetch());
//     const {data} = await PostService.getNotification();
//     console.log(data, 'llll');
//     // dispatch(fetchSuccess(data.data.user));
//   } catch (error) {
//     Alert.alert(error.response.data.message);
//     dispatch(fetchError());
//   }
// };
