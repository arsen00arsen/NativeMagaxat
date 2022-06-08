import {$authHost} from '..';

export default class ImageUploadService {
  static uploadImage(data) {
    return $authHost.post('/posts_api', data);
  }
}
