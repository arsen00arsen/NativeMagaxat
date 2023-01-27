import {AppearsService} from '../../http/getUsersService/getUsersService';
import {
  LOAD_APPEARS,
  LOAD_APPEARS_ERROR,
  LOAD_APPEARS_SUCCESS,
  LOAD_APPEARS_INITIAL_SUCCESS,
} from './type';

export const startLoadAppears = payload => ({
  type: LOAD_APPEARS,
  payload,
});

export const setAppears = appears => ({
  type: LOAD_APPEARS_SUCCESS,
  payload: appears,
});
export const setInitialAppears = appears => ({
  type: LOAD_APPEARS_INITIAL_SUCCESS,
  payload: appears,
});
export const setAppearsError = msg => ({
  type: LOAD_APPEARS_ERROR,
  payload: msg,
});

export const loadAppears =
  (currentpages = 1) =>
  async dispatch => {
    console.log(currentpages);
    try {
      dispatch(startLoadAppears(true));
      // console.log(currentpages, 'aaa');
      let {data} = await AppearsService.getAppers(currentpages);
      // console.log(data.data.data.length, 'length');
      // console.log(data, 'data.data.data');
      // if (data.data.data.length > 0) {
      //   console.log('haslength');
      //   dispatch(setAppears(data.data.data));
      // }

      // for (let i = 0; i < 10; i++) {
      //   data.data.data.push(data.data.data[0]);
      // }
      if (currentpages === 1) {
        dispatch(setAppears(data.data.data));
      } else {
        dispatch(setInitialAppears(data.data.data));
      }
    } catch (error) {
      dispatch(setAppearsError(error));
    } finally {
      dispatch(startLoadAppears(false));
    }
  };
