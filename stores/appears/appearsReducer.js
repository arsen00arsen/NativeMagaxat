import {LOAD_APPEARS, LOAD_APPEARS_ERROR, LOAD_APPEARS_SUCCESS} from './type';

const initialState = {
  appears: [],
  isLoading: false,
  error: '',
};

export const appearsReducer = (state = initialState, action) => {
  const {payload, type} = action;
  switch (type) {
    case LOAD_APPEARS:
      return {
        ...state,
        isLoading: payload,
      };
    case LOAD_APPEARS_SUCCESS:
      return {
        ...state,
        appears: [...state.appears, ...payload],
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
