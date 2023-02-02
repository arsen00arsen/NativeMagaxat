import {PostService} from '../../../http/postService/postService';
import {
  LOAD_POSTS,
  LOAD_ACCOUNT_USER_POSTS,
  LOAD_ACCOUNT_USER_POSTS_ERROR,
} from './type';

export const startLoadPosts = payload => ({
  type: LOAD_POSTS,
  payload,
});

export const setUserAccountPosts = posts => ({
  type: LOAD_ACCOUNT_USER_POSTS,
  payload: posts,
});

export const setUserAccountPostsInitial = posts => ({
  type: LOAD_ACCOUNT_USER_POSTS,
  payload: posts,
});

export const setPostsError = msg => ({
  type: LOAD_ACCOUNT_USER_POSTS_ERROR,
  payload: msg,
});

export const loadAccountUserPosts =
  ({currentpage = 1, id}) =>
  async dispatch => {
    try {
      dispatch(startLoadPosts(true));
      const {data} = await PostService.loadPostsUser({id, currentpage});
      if (currentpage === 1) {
        dispatch(setUserAccountPostsInitial(data.data.data));
      } else {
        dispatch(setUserAccountPosts(data.data.data));
      }
    } catch (error) {
      dispatch(setPostsError(error));
    } finally {
      dispatch(startLoadPosts(false));
    }
  };
