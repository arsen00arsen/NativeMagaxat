import {$authHost} from '..';

export class GetUserService {
  static getUserId(id) {
    return $authHost.get(`/users/list/${id}`);
  }
}

export class GetBenUserService {
  static getBenUserId(id) {
    return $authHost.get(`/users/list/${id}`);
  }
}
