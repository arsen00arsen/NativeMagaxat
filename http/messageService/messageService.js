import {$authHost} from '..';
import {useDispatch} from 'react-redux';
export class MessageService {
  static getMessages(id) {
    return $authHost.get(`/conversation/${id}`);
  }
  static sendMessages(data) {
    return $authHost.post('/conversation/send', data);
  }
}
// .then(res => {
//   console.log(res.data);
// });
