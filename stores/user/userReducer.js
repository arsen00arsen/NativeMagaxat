const initialUserState = {
  user: {},
  loading: false,
  error: null,
  isAuth: false,
  data: {
    interesting_type: [],
  },
};

export const userReducer = (state = initialUserState, action) => {
  const {payload, type} = action;
  switch (type) {
    case 'LOGIN_START':
      return {
        ...state,
        loading: true,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        user: payload,
        isAuth: true,
      };
    case 'LOGIN_ERROR':
      return {
        ...state,
        loading: false,
        user: {},
        isAuth: false,
        error: payload,
        data: {
          interesting_type: [],
        },
      };

    case 'FIRST_STEP_SUBMIT':
      return {
        ...state,
        data: {
          ...state.data,
          ...payload,
        },
      };
    case 'INTERESTEDS_STEP_SUBMIT':
      return {
        ...state,
        data: {
          ...state.data,
          interesting_type: [...state.data.interesting_type, ...payload],
        },
      };
    default:
      return state;
  }
};
