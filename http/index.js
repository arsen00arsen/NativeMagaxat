import axios from 'axios';

const baseUrl = 'http://magaghat.loc/api/v1';

export const $api = axios.create({
  baseURL: '',
  withCredentials: true,
});

// const test = () => {
//   return fetch('http://127.0.0.1:8081/api/v1/countries')
//     .then(response => response.json())
//     .then(json => {
//       console.log(json);
//     })
//     .catch(error => {
//       console.error(error);
//     });
// };
