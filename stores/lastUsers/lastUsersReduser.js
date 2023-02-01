import {
  LOAD_USERS,
  LOAD_USERS_ERROR,
  LOAD_USERS_SUCCESS,
  LOAD_USERS_INITIAL_SUCCESS,
} from './type';

const initialState = {
  lastUsers: [],
  isLoading: false,
  error: '',
};

export const lastUserReducer = (state = initialState, action) => {
  const {payload, type} = action;
  switch (type) {
    case LOAD_USERS:
      return {
        ...state,
        isLoading: payload,
      };
    case LOAD_USERS_SUCCESS:
      return {
        ...state,
        lastUsers: payload,
        isLoading: false,
      };
    case LOAD_USERS_INITIAL_SUCCESS:
      return {
        ...state,
        lastUsers: [...state.lastUsers, ...payload],
        isLoading: false,
      };
    case LOAD_USERS_ERROR:
      return {
        ...state,
        lastUsers: [],
        isLoading: false,
        error: payload,
      };
    default:
      return state;
  }
};
