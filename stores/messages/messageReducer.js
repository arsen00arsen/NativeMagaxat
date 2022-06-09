import {
  LOAD_MESSAGES_SUCCESS,
  LOAD_MESSAGES_ERROR,
  SET_SINGLE_MESSAGES,
  LOAD_ALL_MESSAGES_SUCCESS,
  LOAD_MESSAGES,
} from './type';

const initialState = {
  messages: [],
  allMessages: [],
  isLoading: false,
  error: '',
};

export const messagesReducer = (state = initialState, action) => {
  const {payload, type} = action;
  switch (type) {
    case LOAD_MESSAGES:
      return {
        ...state,
        isLoading: payload,
      };
    case LOAD_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: payload,
        isLoading: false,
      };
    case LOAD_MESSAGES_ERROR:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
      case LOAD_ALL_MESSAGES_SUCCESS:
        return {
          ...state,
          allMessages: payload,
          error: payload,
        };
    case SET_SINGLE_MESSAGES:
      return {
        ...state,
        messages: [...state.messages, payload],
      };
    default:
      return state;
  }
};
