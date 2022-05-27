import {
  LOAD_POSTS,
  SET_COMMENTS,
  LOAD_POSTS_ERROR,
  LOAD_POSTS_SUCCESS,
} from './types';

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
    case SET_COMMENTS:
      const {id, data} = payload;
      const foundPost = state.posts.map(el => {
        if (el.id === id) {
          return {
            ...el,
            comments: [...el.comments, data],
          };
        }
        return el;
      });

      return {
        ...state,
        posts: [...foundPost],
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
