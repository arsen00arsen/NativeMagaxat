import {
  LOAD_POSTS,
  SET_COMMENTS,
  LOAD_POSTS_ERROR,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_INITIAL_SUCCESS,
  SET_SINGLE_POSTS,
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
    case LOAD_POSTS_INITIAL_SUCCESS:
      return {
        ...state,
        posts: payload,
        isLoading: false,
      };
    case SET_COMMENTS:
      const {id, data} = payload;
      console.log(payload, ';;;;;;;;;;;;;;;;;;;;');
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
        // posts: [],
        isLoading: false,
        error: payload,
      };
    case SET_SINGLE_POSTS:
      return {
        ...state,
        posts: [payload, ...state.posts],
      };
    default:
      return state;
  }
};
