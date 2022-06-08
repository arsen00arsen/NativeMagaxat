import MediaService from '../../http/mediaService/mediaService';
import {LOAD_MEDIAS, LOAD_MEDIAS_ERROR, LOAD_MEDIAS_SUCCESS} from './types';

export const startLoadMedias = payload => ({
  type: LOAD_MEDIAS,
  payload,
});

export const setMedias = medias => ({
  type: LOAD_MEDIAS_SUCCESS,
  payload: medias,
});

export const setMediasError = msg => ({
  type: LOAD_MEDIAS_ERROR,
  payload: msg,
});

export const loadAllMedias = () => async dispatch => {
  try {
    dispatch(startLoadMedias(true));
    const {data} = await MediaService.loadMedias();
    dispatch(setMedias(data.data.data));
  } catch (error) {
    dispatch(setMediasError(error));
  } finally {
    dispatch(startLoadMedias(false));
  }
};
