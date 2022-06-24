import {
  LOAD_STORIES,
  LOAD_STORIES_ERROR,
  LOAD_STORIES_SUCCESS,
  LOAD_STORIES_INITIAL_SUCCESS,
  SET_SINGLE_STORIES,
} from './types';

const initialState = {
  stori: [],
  isLoading: false,
  error: '',
};

export const storiReducer = (state = initialState, action) => {
  const {payload, type} = action;
  switch (type) {
    case LOAD_STORIES:
      return {
        ...state,
        isLoading: payload,
      };
    case LOAD_STORIES_SUCCESS:
      return {
        ...state,
        stori: [...state.stori, ...payload],
        isLoading: false,
      };
    case LOAD_STORIES_INITIAL_SUCCESS:
      return {
        ...state,
        stori: payload,
        isLoading: false,
      };
    case LOAD_STORIES_ERROR:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case SET_SINGLE_STORIES:
      return {
        ...state,
        stori: [payload, ...state.stori],
      };
    default:
      return state;
  }
};
