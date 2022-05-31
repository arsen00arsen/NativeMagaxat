import {$authHost} from '..';

export default class ImageUploadService {
  static uploadImage(data) {
    // let post = {image_path: data._parts[0][1][0], title: data._parts[1][1]};
    console.log(data, 'lllloooooooooooiiiiiiii');
    return $authHost.post('/posts_api', data);
  }
}
