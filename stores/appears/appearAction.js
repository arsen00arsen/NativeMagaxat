import {
  AppearsService,
  GetBenefactorsService,
} from '../../http/getUsersService/getUsersService';
import {
  LOAD_APPEARS,
  LOAD_APPEARS_ERROR,
  LOAD_APPEARS_SUCCESS,
  LOAD_APPEARS_INITIAL_SUCCESS,
  LOAD_SPONSORS_INITIAL_SUCCESS,
  LOAD_SPONSORS_SUCCESS,
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

export const setSponsors = sponsors => ({
  type: LOAD_SPONSORS_SUCCESS,
  payload: sponsors,
});
export const setInitialSponsors = sponsors => ({
  type: LOAD_SPONSORS_INITIAL_SUCCESS,
  payload: sponsors,
});

export const setAppearsError = msg => ({
  type: LOAD_APPEARS_ERROR,
  payload: msg,
});

export const loadAppears =
  (currentPage = 1) =>
  async dispatch => {
    try {
      dispatch(startLoadAppears(true));
      let {data} = await AppearsService.getAppers(currentPage);
      if (currentPage === 1) {
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

export const loadSponsors =
  (currentpages = 1) =>
  async dispatch => {
    try {
      dispatch(startLoadAppears(true));
      let {data} = await GetBenefactorsService.getBenefactors(currentpages);
      if (currentpages === 1) {
        dispatch(setSponsors(data.data.data));
      } else {
        dispatch(setInitialSponsors(data.data.data));
      }
    } catch (error) {
      dispatch(setAppearsError(error));
    } finally {
      dispatch(startLoadAppears(false));
    }
  };
