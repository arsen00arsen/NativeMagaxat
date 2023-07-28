import {$authHost, $host} from '..';

export default class UserService {
  static registre(data) {
    return $host.post('/registre', data);
  }
  static getCategories() {
    return $host.get('/category');
  }
  static getCountry() {
    return $host.get('/country');
  }
}
