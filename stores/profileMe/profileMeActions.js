import {MyPostService} from '../../http/postService/postService';
import {LOAD_MYPOSTS, LOAD_MYPOSTS_ERROR, LOAD_MYPOSTS_SUCCESS} from './type';

export const startLoadMyPosts = payload => ({
  type: LOAD_MYPOSTS,
  payload,
});

export const setMyPosts = myPosts => ({
  type: LOAD_MYPOSTS_SUCCESS,
  payload: myPosts,
});

export const setMyPostsError = msg => ({
  type: LOAD_MYPOSTS_ERROR,
  payload: msg,
});

export const loadMyPosts = () => async dispatch => {
  try {
    dispatch(startLoadMyPosts(true));
    const {data} = await MyPostService.loadMyPosts();
    dispatch(setMyPosts(data.data));
  } catch (error) {
    dispatch(setMyPostsError(error));
  } finally {
    dispatch(startLoadMyPosts(false));
  }
};
