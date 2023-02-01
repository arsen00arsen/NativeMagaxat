import {PostService} from '../../http/postService/postService';
import {
  LOAD_MYPOSTS,
  LOAD_MYPOSTS_ERROR,
  LOAD_MYPOSTS_SUCCESS,
  REMOVE_SINGLE_POST,
  LOAD_MYPOSTS_INITIAL_SUCCESS,
  LOAD_MYUSUBSCRIPTIONS_SUCCESS,
  LOAD_MYUSUBSCRIPTIONS_INITIAL_SUCCESS,
  LOAD_MYUSUBSCRIBERS_SUCCESS,
  LOAD_MYUSUBSCRIBERS_INITIAL_SUCCESS,
} from './type';

export const startLoadMyPosts = payload => ({
  type: LOAD_MYPOSTS,
  payload,
});

export const setMyPosts = myPosts => ({
  type: LOAD_MYPOSTS_SUCCESS,
  payload: myPosts,
});
export const setMyUsersSubscriptions = users => ({
  type: LOAD_MYUSUBSCRIPTIONS_SUCCESS,
  payload: users,
});
export const setMyUsersInitialSubscriptions = users => ({
  type: LOAD_MYUSUBSCRIPTIONS_INITIAL_SUCCESS,
  payload: users,
});

export const setMyUsersSubscribers = subscribtions => ({
  type: LOAD_MYUSUBSCRIBERS_SUCCESS,
  payload: subscribtions,
});
export const setMyUsersInitialSubscribers = users => ({
  type: LOAD_MYUSUBSCRIBERS_INITIAL_SUCCESS,
  payload: users,
});

export const setMyPostsError = msg => ({
  type: LOAD_MYPOSTS_ERROR,
  payload: msg,
});
export const setMyInitialPosts = msg => ({
  type: LOAD_MYPOSTS_INITIAL_SUCCESS,
  payload: msg,
});
export const removeSinglePost = id => {
  return {
    type: REMOVE_SINGLE_POST,
    payload: id,
  };
};

export const loadMyPosts = currentpage => async dispatch => {
  try {
    dispatch(startLoadMyPosts(true));
    const {data} = await PostService.loadMyPosts(currentpage);
    if (currentpage === 1) {
      dispatch(setMyPosts(data.data.posts.data));
    } else {
      dispatch(setMyInitialPosts(data.data.posts.data));
    }
    //dispatch(setMyPosts(data.data));
  } catch (error) {
    dispatch(setMyPostsError(error));
  } finally {
    dispatch(startLoadMyPosts(false));
  }
};
export const loadMuSubrcribtions = currentpage => async dispatch => {
  try {
    dispatch(startLoadMyPosts(true));
    const {data} = await PostService.loadMySubscriptions(currentpage);
    if (currentpage === 1) {
      dispatch(setMyUsersSubscriptions(data.data.data));
    } else {
      dispatch(setMyUsersInitialSubscriptions(data.data.data));
    }
  } catch (error) {
    dispatch(setMyPostsError(error));
  } finally {
    dispatch(startLoadMyPosts(false));
  }
};

export const loadMuSubrcribers = currentpage => async dispatch => {
  try {
    dispatch(startLoadMyPosts(true));
    const {data} = await PostService.loadMySubscribers(currentpage);
    if (currentpage === 1) {
      dispatch(setMyUsersSubscribers(data.data.data));
    } else {
      dispatch(setMyUsersInitialSubscribers(data.data.data));
    }
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
