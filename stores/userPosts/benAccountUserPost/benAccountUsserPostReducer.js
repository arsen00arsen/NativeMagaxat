import {
  LOAD_POSTS,
  LOAD_ACCOUNT_USER_POSTS,
  LOAD_ACCOUNT_USER_POSTS_INITIAL_SUCCESS,
  LOAD_ACCOUNT_USER_POSTS_ERROR,
} from './type';

const initialState = {
  isLoading: false,
  error: '',
  accountUsersPosts: [],
};

export const benefactorAccountUserPostReducer = (
  state = initialState,
  action,
) => {
  const {payload, type} = action;
  switch (type) {
    case LOAD_POSTS:
      return {
        ...state,
        isLoading: payload,
      };
    case LOAD_ACCOUNT_USER_POSTS:
      return {
        ...state,
        accountUsersPosts: payload,
        isLoading: false,
      };
    case LOAD_ACCOUNT_USER_POSTS_INITIAL_SUCCESS:
      return {
        ...state,
        accountUsersPosts: [...state.accountUsersPosts, ...payload],
        isLoading: false,
      };
    case LOAD_ACCOUNT_USER_POSTS_ERROR:
      return {
        ...state,
        accountUsersPosts: [],
        isLoading: false,
        error: payload,
      };
    default:
      return state;
  }
};
