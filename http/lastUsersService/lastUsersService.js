import {$authHost} from '..';

export default class LastUsers {
  static loadLastUsers(page) {
    return $authHost.get(`/users/list?page=${page}`);
  }
  static loadChatUsers() {
    return $authHost.get('/contacts');
  }
}
