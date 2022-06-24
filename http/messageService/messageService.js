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

// .then(res => console.log(res, 'llllllllllll'))
// .catch(function (error) {
//   if (error.response) {
//     // Request made and server responded
//     console.log(error.response.data);
//     console.log(error.response.status);
//     console.log(error.response.headers);
//   } else if (error.request) {
//     // The request was made but no response was received
//     console.log(error.request);
//   } else {
//     // Something happened in setting up the request that triggered an Error
//     console.log('Error', error.message);
//   }
// });
