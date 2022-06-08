import {$authHost} from '..';

export class MessageService {
  static getMessages(id) {
    return $authHost.get(`/conversation/${id}`);
  }
  static sendMessages(data) {
    console.log(data);
    return $authHost.post('/conversation/send', data);
  }
}
