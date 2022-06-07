import {
  LOAD_MYPOSTS,
  LOAD_MYPOSTS_ERROR,
  LOAD_MYPOSTS_SUCCESS,
  REMOVE_SINGLE_POST,
} from './type';

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
    case REMOVE_SINGLE_POST:
      return {
        ...state,
        myPosts: state.myPosts.filter(el => el.id !== payload),
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
