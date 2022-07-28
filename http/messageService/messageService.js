import {$authHost} from '..';

export class MessageService {
  static getMessages(id) {
    return $authHost.get(`/conversation/${id}`);
  }
  static sendMessages(data) {
    return $authHost.post('/conversation/send', data);
  }
  static isRead(data) {
    return $authHost.post('/conversation/read', data);
  }
  static getMessagesCount() {
    return $authHost.get('/unread/count');
  }
}
