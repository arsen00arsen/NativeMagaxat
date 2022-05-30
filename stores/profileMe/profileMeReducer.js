import {LOAD_MYPOSTS, LOAD_MYPOSTS_ERROR, LOAD_MYPOSTS_SUCCESS} from './type';

const initialState = {
  myPosts: [],
  isLoading: false,
  error: '',
};

export const myPostReducer = (state = initialState, action) => {
  const {payload, type} = action;
  switch (type) {
    case LOAD_MYPOSTS:
      return {
        ...state,
        isLoading: payload,
      };
    case LOAD_MYPOSTS_SUCCESS:
      return {
        ...state,
        myPosts: payload,
        isLoading: false,
      };
    case LOAD_MYPOSTS_ERROR:
      return {
        ...state,
        myPosts: [],
        isLoading: false,
        error: payload,
      };
    default:
      return state;
  }
};
