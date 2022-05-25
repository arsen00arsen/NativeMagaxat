import {useEffect, useState} from 'react';
import {baseUrl2} from '../../http';
import {useSelector} from 'react-redux';
const url = baseUrl2 + '/users/list/';

export const useAccountProfHome = () => {
  const [options, setOptions] = useState([]);
  const id = useSelector(state => state.usser.usserAccountId);
  let i = id.toString();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url + i, {
          headers: {
            Authorization:
              'Bearer ' + '10|oMlp7229KYP9nfdN2BrtCC2CjCuJIJF48fZsrV0J',
          },
        });
        const json = await response.json();
        setOptions(json);
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchData();
  }, []);

  return {options};
};
