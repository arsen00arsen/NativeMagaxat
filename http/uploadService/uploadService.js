import {$authHost} from '..';

export class UploadUserService {
  static uploadUser(data) {
    return $authHost.patch('/profile/update', data);
  }
}
// .then(res => console.log(res.data))
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
