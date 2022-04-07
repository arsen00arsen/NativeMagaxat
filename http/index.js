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

// let nextStep = async () => {
//   await submitFormHandler();
//   const requestOptions = {
//     method: 'GET',
//   };
//   const response = await fetch(
//     'http://192.168.0.107:8081/api/v1/countries',
//     requestOptions,
//   );
//   const json = await response.json();
//   console.log('Успех:', JSON.stringify(json));
// };
