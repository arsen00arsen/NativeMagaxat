import {$authHost} from '..';

export default class LastUsers {
  static loadLastUsers() {
    return $authHost.get('/users/list');
  }
}
