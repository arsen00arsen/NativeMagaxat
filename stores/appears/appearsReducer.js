import {
  LOAD_APPEARS,
  LOAD_APPEARS_ERROR,
  LOAD_APPEARS_SUCCESS,
  LOAD_APPEARS_INITIAL_SUCCESS,
  LOAD_SPONSORS_INITIAL_SUCCESS,
  LOAD_SPONSORS_SUCCESS,
} from './type';

const initialState = {
  appears: [],
  isLoading: false,
  error: '',
  sponsors: [],
};

export const appearsReducer = (state = initialState, action) => {
  const {payload, type} = action;
  switch (type) {
    case LOAD_APPEARS:
      return {
        ...state,
        isLoading: payload,
      };
    case LOAD_APPEARS_INITIAL_SUCCESS:
      return {
        ...state,
        appears: [...state.appears, ...payload],
        isLoading: false,
      };
    case LOAD_APPEARS_SUCCESS:
      return {
        ...state,
        appears: payload,
        isLoading: false,
      };
    case LOAD_SPONSORS_INITIAL_SUCCESS:
      return {
        ...state,
        sponsors: [...state.sponsors, ...payload],
        isLoading: false,
      };
    case LOAD_SPONSORS_SUCCESS:
      return {
        ...state,
        sponsors: payload,
        isLoading: false,
      };
    case LOAD_APPEARS_ERROR:
      return {
        ...state,
        appears: [],
        isLoading: false,
        error: payload,
      };
    default:
      return state;
  }
};
