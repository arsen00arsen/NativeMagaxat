import {
  LOAD_CHAT_USERS,
  LOAD_CHAT_USERS_ERROR,
  LOAD_CHAT_USERS_SUCCESS,
} from './type';

const initialState = {
  chatUsers: [],
  isLoading: false,
  error: '',
};

export const chatUserReducer = (state = initialState, action) => {
  const {payload, type} = action;
  switch (type) {
    case LOAD_CHAT_USERS:
      return {
        ...state,
        isLoading: payload,
      };
    case LOAD_CHAT_USERS_SUCCESS:
      return {
        ...state,
        chatUsers: payload,
        isLoading: false,
      };
    case LOAD_CHAT_USERS_ERROR:
      return {
        ...state,
        chatUsers: [],
        isLoading: false,
        error: payload,
      };
    default:
      return state;
  }
};
