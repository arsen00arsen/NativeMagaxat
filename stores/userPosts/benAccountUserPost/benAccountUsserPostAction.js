import {PostService} from '../../../http/postService/postService';
import {
  LOAD_POSTS,
  LOAD_ACCOUNT_USER_POSTS,
  LOAD_ACCOUNT_USER_POSTS_ERROR,
  LOAD_ACCOUNT_USER_POSTS_INITIAL_SUCCESS,
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
  type: LOAD_ACCOUNT_USER_POSTS_INITIAL_SUCCESS,
  payload: posts,
});

export const setPostsError = msg => ({
  type: LOAD_ACCOUNT_USER_POSTS_ERROR,
  payload: msg,
});

export const loadBenefactorUserPosts =
  ({currentPage = 1, id}) =>
  async dispatch => {
    try {
      dispatch(startLoadPosts(true));
      const {data} = await PostService.loadPostsUser({id, currentPage});
      if (currentPage === 1) {
        dispatch(setUserAccountPosts(data.data.data));
      } else {
        dispatch(setUserAccountPostsInitial(data.data.data));
      }
    } catch (error) {
      dispatch(setPostsError(error));
    } finally {
      dispatch(startLoadPosts(false));
    }
  };
