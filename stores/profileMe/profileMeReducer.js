import {
  LOAD_MYPOSTS,
  LOAD_MYPOSTS_ERROR,
  LOAD_MYPOSTS_SUCCESS,
  REMOVE_SINGLE_POST,
  LOAD_MYPOSTS_INITIAL_SUCCESS,
  LOAD_MYUSUBSCRIPTIONS_SUCCESS,
  LOAD_MYUSUBSCRIPTIONS_INITIAL_SUCCESS,
  LOAD_MYUSUBSCRIBERS_INITIAL_SUCCESS,
  LOAD_MYUSUBSCRIBERS_SUCCESS,
} from './type';

const initialState = {
  myPosts: [],
  isLoading: false,
  error: '',
  subscriptions: [],
  subscribers: [],
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
    case LOAD_MYUSUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        subscriptions: payload,
        isLoading: false,
      };
    case LOAD_MYUSUBSCRIPTIONS_INITIAL_SUCCESS:
      return {
        ...state,
        subscriptions: [...state.subscriptions, ...payload],
        isLoading: false,
      };
    case LOAD_MYUSUBSCRIBERS_SUCCESS:
      return {
        ...state,
        subscribers: payload,
        isLoading: false,
      };
    case LOAD_MYUSUBSCRIBERS_INITIAL_SUCCESS:
      return {
        ...state,
        subscribers: [...state.subscribers, ...payload],
        isLoading: false,
      };
    case LOAD_MYPOSTS_INITIAL_SUCCESS:
      return {
        ...state,
        myPosts: [...state.myPosts, ...payload],
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
