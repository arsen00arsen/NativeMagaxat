import {$authHost} from '..';

export default class ImageUploadService {
  static uploadImage(data) {
    console.log(data, 'lklklk');
    return $authHost.post('/posts_api', {
      data,
    });
  }
}
