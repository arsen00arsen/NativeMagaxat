import {$authHost} from '..';

export default class LastUsers {
  static loadLastUsers() {
    return $authHost.get('/users/list');
  }
  static loadChatUsers() {
    return $authHost.get('/contacts');
  }
}
