import {LOAD_POSTS, LOAD_POSTS_ERROR, LOAD_POSTS_SUCCESS} from './types';

const initialState = {
  posts: [],
  isLoading: false,
  error: '',
};

export const postReducer = (state = initialState, action) => {
  const {payload, type} = action;
  switch (type) {
    case LOAD_POSTS:
      return {
        ...state,
        isLoading: payload,
      };
    case LOAD_POSTS_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, ...payload],
        isLoading: false,
      };
    case LOAD_POSTS_ERROR:
      return {
        ...state,
        posts: [],
        isLoading: false,
        error: payload,
      };
    default:
      return state;
  }
};
