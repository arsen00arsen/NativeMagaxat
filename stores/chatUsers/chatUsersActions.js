import LastUsers from '../../http/lastUsersService/lastUsersService';
import {
  LOAD_CHAT_USERS,
  LOAD_CHAT_USERS_ERROR,
  LOAD_CHAT_USERS_SUCCESS,
} from './type';

export const startLoadChatUsers = payload => ({
  type: LOAD_CHAT_USERS,
  payload,
});

export const setChatUser = chatUsers => ({
  type: LOAD_CHAT_USERS_SUCCESS,
  payload: chatUsers,
});

export const setChatUsersError = msg => ({
  type: LOAD_CHAT_USERS_ERROR,
  payload: msg,
});

export const loadChatUser = () => async dispatch => {
  try {
    dispatch(startLoadChatUsers(true));
    const {data} = await LastUsers.loadChatUsers();
    dispatch(setChatUser(data.contacts));
  } catch (error) {
    dispatch(setChatUsersError(error));
  } finally {
    dispatch(startLoadChatUsers(false));
  }
};
