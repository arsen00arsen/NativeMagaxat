import {LOAD_MEDIAS, LOAD_MEDIAS_ERROR, LOAD_MEDIAS_SUCCESS} from './types';

const initialState = {
  medias: [],
  isLoading: false,
  error: '',
};

export const mediaReducer = (state = initialState, action) => {
  const {payload, type} = action;
  switch (type) {
    case LOAD_MEDIAS:
      return {
        ...state,
        isLoading: payload,
      };
    case LOAD_MEDIAS_ERROR:
      return {
        ...state,
        medias: [],
        isLoading: false,
      };
    case LOAD_MEDIAS_SUCCESS:
      return {
        ...state,
        medias: [...payload],
        isLoading: false,
        error: payload,
      };
    default:
      return state;
  }
};
