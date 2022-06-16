import {$authHost} from '..';

export default class MediaService {
  static loadMedias() {
    return $authHost.get('/videos_api');
  }
}
