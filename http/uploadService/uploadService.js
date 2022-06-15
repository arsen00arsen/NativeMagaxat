import {$authHost} from '..';

export class UploadUserService {
  static uploadUser(data) {
    console.log(data, 'ddattttaaaaa');
    return $authHost.patch('/profile/update', data).then(res => {
      console.log(res, ',,');
    });
  }
}
