import CommentAddService from '../../http/addComment/addComment';
import PostService from '../../http/postService/postService';
import {
  LOAD_POSTS,
  SET_COMMENTS,
  LOAD_POSTS_ERROR,
  LOAD_POSTS_SUCCESS,
} from './types';

export const startLoadPosts = payload => ({
  type: LOAD_POSTS,
  payload,
});

export const setPosts = posts => ({
  type: LOAD_POSTS_SUCCESS,
  payload: posts,
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
  (currentpage = 1) =>
  async dispatch => {
    try {
      dispatch(startLoadPosts(true));
      const {data} = await PostService.loadPosts(currentpage);
      dispatch(setPosts(data.data.data));
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
