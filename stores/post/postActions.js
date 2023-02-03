import {CommentAddService} from '../../http/addComment/addComment';
import {PostService} from '../../http/postService/postService';
import {
  LOAD_POSTS,
  SET_COMMENTS,
  LOAD_POSTS_ERROR,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_INITIAL_SUCCESS,
  SET_SINGLE_POSTS,
  LOAD_USER_POSTS_INITIAL_SUCCESS,
  LOAD_USER_POSTS_SUCCESS,
} from './types';

export const startLoadPosts = payload => ({
  type: LOAD_POSTS,
  payload,
});

export const setPosts = posts => ({
  type: LOAD_POSTS_SUCCESS,
  payload: posts,
});

export const setPostsInitial = posts => ({
  type: LOAD_POSTS_INITIAL_SUCCESS,
  payload: posts,
});
export const setUserPosts = posts => ({
  type: LOAD_USER_POSTS_SUCCESS,
  payload: posts,
});

export const setUserPostsInitial = posts => ({
  type: LOAD_USER_POSTS_INITIAL_SUCCESS,
  payload: posts,
});
export const setSinglePost = payload => ({
  type: SET_SINGLE_POSTS,
  payload,
});

export const setPostsError = msg => ({
  type: LOAD_POSTS_ERROR,
  payload: msg,
});

export const setComments = data => ({
  type: SET_COMMENTS,
  payload: data,
});

export const loadPosts =
  (currentpageIs = 1) =>
  async dispatch => {
    try {
      dispatch(startLoadPosts(true));
      const {data} = await PostService.loadPosts(currentpageIs);
      if (currentpageIs === 1) {
        dispatch(setPostsInitial(data.data.data));
      } else {
        dispatch(setPosts(data.data.data));
      }
    } catch (error) {
      dispatch(setPostsError(error));
    } finally {
      dispatch(startLoadPosts(false));
    }
  };
export const loadPostsUser =
  ({currentpage = 1, id}) =>
  async dispatch => {
    try {
      dispatch(startLoadPosts(true));
      const {data} = await PostService.loadPostsUser({id, currentpage});
      if (currentpage === 1) {
        dispatch(setUserPostsInitial(data.data.data));
      } else {
        dispatch(setUserPosts(data.data.data));
      }
    } catch (error) {
      dispatch(setPostsError(error));
    } finally {
      dispatch(startLoadPosts(false));
    }
  };

export const sendComment = (id, submitData) => async dispatch => {
  try {
    dispatch(startLoadPosts(true));
    const {data} = await CommentAddService.addComment({id, ...submitData});
    dispatch(setComments({id, data: data.comment}));
  } catch (error) {
    dispatch(setPostsError(error));
  } finally {
    dispatch(startLoadPosts(false));
  }
};
