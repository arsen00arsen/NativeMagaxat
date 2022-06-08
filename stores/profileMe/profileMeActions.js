import {PostService} from '../../http/postService/postService';
import {
  LOAD_MYPOSTS,
  LOAD_MYPOSTS_ERROR,
  LOAD_MYPOSTS_SUCCESS,
  REMOVE_SINGLE_POST,
} from './type';

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

export const removeSinglePost = id => {
  console.log(id, 'heto ste');
  return {
    type: REMOVE_SINGLE_POST,
    payload: id,
  };
};

export const loadMyPosts = () => async dispatch => {
  try {
    dispatch(startLoadMyPosts(true));
    const {data} = await PostService.loadMyPosts();
    dispatch(setMyPosts(data.data));
  } catch (error) {
    dispatch(setMyPostsError(error));
  } finally {
    dispatch(startLoadMyPosts(false));
  }
};

export const removeMyPosts = id => async dispatch => {
  try {
    dispatch(startLoadMyPosts(true));
    const {data} = await PostService.deletedPost(id);
    if (data.success) {
      dispatch(loadMyPosts());
    }
  } catch (error) {
    dispatch(setMyPostsError(error));
  } finally {
    dispatch(startLoadMyPosts(false));
  }
};
