import {
  LOAD_MESSAGES_SUCCESS,
  MESSAGES_COUNT,
  LOAD_MESSAGES_ERROR,
  SET_SINGLE_MESSAGES,
  LOAD_ALL_MESSAGES_SUCCESS,
  LOAD_MESSAGES,
} from './type';

const initialState = {
  messages: [],
  messageCount: 0,
  allNewMessages: [],
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
    case MESSAGES_COUNT:
      return {
        ...state,
        messageCount: payload,
      };
    case LOAD_MESSAGES_ERROR:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case LOAD_ALL_MESSAGES_SUCCESS:
      // state.allNewMessages.filter(el => {
      //   if (el.from === payload.from) {
      //     return {
      //       ...el,
      //       allNewMessages: [...el.allNewMessages, payload],
      //     };
      //   }
      //   return el;
      // });
      return {
        ...state,
        allNewMessages: [payload, ...state.allNewMessages],
        error: payload,
      };
    case SET_SINGLE_MESSAGES:
      return {
        ...state,
        messages: [payload, ...state.messages],
      };
    default:
      return state;
  }
};
