import LastUsers from '../../http/lastUsersService/lastUsersService';
import {
  LOAD_USERS,
  LOAD_USERS_ERROR,
  LOAD_USERS_SUCCESS,
  LOAD_USERS_INITIAL_SUCCESS,
} from './type';

export const startLoadLastUsers = payload => ({
  type: LOAD_USERS,
  payload,
});

export const setLastUser = lastUsers => ({
  type: LOAD_USERS_SUCCESS,
  payload: lastUsers,
});
export const setLastUsersInitial = lastUsers => ({
  type: LOAD_USERS_INITIAL_SUCCESS,
  payload: lastUsers,
});
export const setLastUsersError = msg => ({
  type: LOAD_USERS_ERROR,
  payload: msg,
});

export const loadUsers =
  (currentpage = 1) =>
  async dispatch => {
    try {
      dispatch(startLoadLastUsers(true));
      const {data} = await LastUsers.loadLastUsers(currentpage);
      if (currentpage === 1) {
        dispatch(setLastUser(data.data.data));
      } else {
        dispatch(setLastUsersInitial(data.data.data));
      }
    } catch (error) {
      dispatch(setLastUsersError(error));
    } finally {
      dispatch(startLoadLastUsers(false));
    }
  };

// export const loadPosts =
//   (currentpage = 1) =>
//   async dispatch => {
//     try {
//       dispatch(startLoadPosts(true));
//       const {data} = await PostService.loadPosts(currentpage);
//       if (currentpage === 1) {
//         dispatch(setPostsInitial(data.data.data));
//       } else {
//         dispatch(setPosts(data.data.data));
//       }
//     } catch (error) {
//       dispatch(setPostsError(error));
//     } finally {
//       dispatch(startLoadPosts(false));
//     }
//   };
