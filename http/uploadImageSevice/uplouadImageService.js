import {$authHost} from '..';

export default class ImageUploadService {
  static uploadImage(data) {
    return $authHost.post('/posts_api', data);
  }
  static changeUserProfileImage(data) {
    return $authHost.post('/profile/change', data);
  }
}
