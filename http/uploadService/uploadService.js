import {$authHost} from '..';

export class UploadUserService {
  static uploadUser(data) {
    return $authHost.patch('/profile/update', data);
  }
}
