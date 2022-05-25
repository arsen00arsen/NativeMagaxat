import {GET_USERS} from '../constants';
import {USSER_SIGN_UP_INTERESTEDTYPE} from '../constants';
import {USSER_SIGN_UP_INTERESTEDTYPE_INDIGENT} from '../constants';
import {USSER_SIGN_UP_PASSWORD} from '../constants';
import {USSER_SIGN_UPLOCATION} from '../constants';
import {USSER_SIGN_UP_LANGUEGE} from '../constants';
import {LOGIN} from '../constants';
import {USSER_ID} from '../constants';
import {FIRE_BASE_USSER} from '../constants';
export {GET_USERS} from '../constants';

const initialState = {
  usserDatePassword: '',
  usserDateLocation: '',
  usserDateLanguage: '',
  login: {},
  usserAccountId: '',
  pending: false,
  posts: [],
  firBaseUser: {},
  users: [],
};
const signUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case USSER_SIGN_UP_INTERESTEDTYPE:
      return {
        ...state,
        userInterestedType: action.payload,
      };
    case USSER_SIGN_UP_INTERESTEDTYPE_INDIGENT:
      return {
        ...state,
        userInterestedTypeIndigent: action.payload,
      };
    case USSER_SIGN_UP_PASSWORD:
      return {
        ...state,
        usserDatePassword: action.payload,
      };
    case USSER_SIGN_UPLOCATION:
      return {
        ...state,
        usserDateLocation: action.payload,
      };
    case USSER_SIGN_UP_LANGUEGE:
      return {
        ...state,
        usserDateLanguage: action.payload,
      };
    case LOGIN:
      return {
        ...state,
        login: action.payload,
      };
    case USSER_ID:
      return {
        ...state,
        usserAccountId: action.payload,
      };
    case FIRE_BASE_USSER:
      return {
        ...state,
        firBaseUser: action.payload,
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
};
export default signUpReducer;

export const getPosts = state => state.posts;
export const getPostsPending = state => state.pending;
