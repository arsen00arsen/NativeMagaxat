import {$authHost, $host} from '..';

export default class UserService {
  static login(data) {
    return $host.post('/login', data);
  }

  static getMe() {
    return $authHost.get('/profile/me');
  }

  static logout() {
    return $authHost.get('/logout');
  }
}
