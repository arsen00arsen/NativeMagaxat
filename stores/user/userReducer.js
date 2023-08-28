const initialUserState = {
  user: {},
  loading: false,
  error: null,
  isAuth: false,
  asGuest: '',
  report: '',
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
        error: null,
      };
    case 'LOGIN_AS_GUEST':
      return {
        ...state,
        asGuest: payload,
        isAuth: true,
        error: null,
      };
    case 'LOGIN_ERROR':
      return {
        ...state,
        loading: false,
        user: {},
        isAuth: false,
        error: payload,
      };

    case 'FIRST_STEP_SUBMIT':
      return {
        ...state,
        data: {
          ...state.data,
          ...payload,
        },
      };
    case 'REPORT_INFO':
      return {
        ...state,
        report: payload,
      };
    default:
      return state;
  }
};
