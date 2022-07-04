import {$authHost, $host} from '..';

export default class UserService {
  static login(data) {
    return $host.post('/login', data);
  }

  static register(data) {
    return $host.post('/register', data);
  }

  static getMe() {
    return $authHost.get('/profile/me');
  }

  static logout() {
    return $authHost.post('/profile/logout');
  }
}
