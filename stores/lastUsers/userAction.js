import LastUsers from '../../http/lastUsersService/lastUsersService';
import {LOAD_USERS, LOAD_USERS_ERROR, LOAD_USERS_SUCCESS} from './type';

export const startLoadLastUsers = payload => ({
  type: LOAD_USERS,
  payload,
});

export const setLastUser = lastUsers => ({
  type: LOAD_USERS_SUCCESS,
  payload: lastUsers,
});

export const setLastUsersError = msg => ({
  type: LOAD_USERS_ERROR,
  payload: msg,
});

export const loadUsers = () => async dispatch => {
  try {
    dispatch(startLoadLastUsers(true));
    const {data} = await LastUsers.loadLastUsers();
    dispatch(setLastUser(data.data));
  } catch (error) {
    dispatch(setLastUsersError(error));
  } finally {
    dispatch(startLoadLastUsers(false));
  }
};
