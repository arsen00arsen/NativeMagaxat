import {CommentAddService} from '../../http/addComment/addComment';
import {PostService} from '../../http/postService/postService';
import {StoriService} from '../../http/storiService/storiService';
import {
  LOAD_STORIES,
  LOAD_STORIES_ERROR,
  LOAD_STORIES_SUCCESS,
  LOAD_STORIES_INITIAL_SUCCESS,
  SET_SINGLE_STORIES,
} from './types';

export const startLoadStori = payload => ({
  type: LOAD_STORIES,
  payload,
});

export const setStori = posts => ({
  type: LOAD_STORIES_SUCCESS,
  payload: posts,
});

export const setStoriInitial = posts => ({
  type: LOAD_STORIES_INITIAL_SUCCESS,
  payload: posts,
});

export const setSingleStori = payload => ({
  type: SET_SINGLE_STORIES,
  payload,
});

export const setStoriError = msg => ({
  type: LOAD_STORIES_ERROR,
  payload: msg,
});

export const loadStori = () => async dispatch => {
  try {
    dispatch(startLoadStori(true));
    const {data} = await StoriService.loadStories();
    dispatch(setStoriInitial(data.data));
  } catch (error) {
    dispatch(setStoriError(error));
  } finally {
    dispatch(startLoadStori(false));
  }
};

export const removeMyStory = id => async dispatch => {
  try {
    dispatch(startLoadStori(true));
    const {data} = await StoriService.deletedStories(id);
    if (data.success) {
      dispatch(loadStori());
    }
  } catch (error) {
    dispatch(setStoriError(error));
  } finally {
    dispatch(startLoadStori(false));
  }
};
