import {$authHost, $host} from '..';

export default class UserService {
  static login(data) {
    return $host.post('/login', data);
  }

  static register(data) {
    console.log(data, 'errr');
    return $host
      .post('/register', data)
      .then(res => console.log(res.data))
      .catch(function (error) {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
      });
  }

  static getMe() {
    return $authHost.get('/profile/me');
  }

  static logout() {
    return $authHost.post('/profile/logout');
  }
}
