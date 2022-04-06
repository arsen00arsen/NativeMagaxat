import {USSER_SIGN_UP_DATA} from '../constants';

export function addDate(usser) {
  return {
    type: USSER_SIGN_UP_DATA,
    payload: usser,
  };
}
