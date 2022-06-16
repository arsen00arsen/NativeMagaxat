import {AppearsService} from '../../http/getUsersService/getUsersService';
import {LOAD_APPEARS, LOAD_APPEARS_ERROR, LOAD_APPEARS_SUCCESS} from './type';

export const startLoadAppears = payload => ({
  type: LOAD_APPEARS,
  payload,
});

export const setAppears = appears => ({
  type: LOAD_APPEARS_SUCCESS,
  payload: appears,
});

export const setAppearsError = msg => ({
  type: LOAD_APPEARS_ERROR,
  payload: msg,
});

export const loadAppears =
  (currentpages = 1) =>
  async dispatch => {
    try {
      dispatch(startLoadAppears(true));
      const {data} = await AppearsService.getAppers(currentpages);
      dispatch(setAppears(data?.data?.data));
    } catch (error) {
      dispatch(setAppearsError(error));
    } finally {
      dispatch(startLoadAppears(false));
    }
  };
