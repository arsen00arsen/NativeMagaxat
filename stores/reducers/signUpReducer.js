import {USSER_SIGN_UP_FLNAMES} from '../constants';
import {USSER_SIGN_UP_DATE} from '../constants';
import {USSER_SIGN_UP_GENDER} from '../constants';
import {USSER_SIGN_UP_MAILPHONE} from '../constants';
import {USSER_SIGN_UP_INTERESTED1} from '../constants';
import {USSER_SIGN_UP_INTERESTED2} from '../constants';
import {USSER_SIGN_UP_INTERESTED3} from '../constants';
import {USSER_SIGN_UP_INTERESTEDTYPE} from '../constants';
import {USSER_SIGN_UP_INTERESTEDTYPE_INDIGENT} from '../constants';
import {USSER_SIGN_UP_PASSWORD} from '../constants';
import {USSER_SIGN_UPLOCATION} from '../constants';
import {USSER_SIGN_UP_LANGUEGE} from '../constants';
import {LOGIN} from '../constants';
import {LOGOUT} from '../constants';
import {USSER_ID} from '../constants';

const initialState = {
  usserDatNLnames: '',
  usserDatDate: '',
  userDateGender: '',
  userEmailPhone: '',
  userInterested1: '',
  userInterested2: '',
  userInterested3: '',
  userInterestedType: '',
  userInterestedTypeIndigent: '',
  usserDatePassword: '',
  usserDateLocation: '',
  usserDateLanguage: '',
  login: {},
  logut: {},
  usserAccountId: '',
};
const signUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case USSER_SIGN_UP_FLNAMES:
      return {
        ...state,
        usserDatNLnames: action.payload,
      };
    case USSER_SIGN_UP_DATE:
      return {
        ...state,
        usserDatDate: action.payload,
      };
    case USSER_SIGN_UP_GENDER:
      return {
        ...state,
        userDateGender: action.payload,
      };
    case USSER_SIGN_UP_MAILPHONE:
      return {
        ...state,
        userEmailPhone: action.payload,
      };
    case USSER_SIGN_UP_INTERESTED1:
      return {
        ...state,
        userInterested1: action.payload,
      };
    case USSER_SIGN_UP_INTERESTED2:
      return {
        ...state,
        userInterested2: action.payload,
      };
    case USSER_SIGN_UP_INTERESTED3:
      return {
        ...state,
        userInterested3: action.payload,
      };
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
    case LOGOUT:
      return {
        ...state,
        logout: null,
      };
    case USSER_ID:
      return {
        ...state,
        usserAccountId: action.payload,
      };
    default:
      // case USSER_SIGN_UP_DATA:
      //   let newArr = state.usserDatas.concat(action.payload);
      //   return {
      //     ...state,
      //     usserDatas: newArr,
      //   };
      // default:
      return state;
  }
};
export default signUpReducer;
