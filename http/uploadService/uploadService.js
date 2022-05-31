import {$authHost} from '..';

export class UploadUserService {
  static uploadUser(data) {
    console.log(data, ';dddddddddddddd');
    return $authHost.patch('/profile/update', data);
  }
}
