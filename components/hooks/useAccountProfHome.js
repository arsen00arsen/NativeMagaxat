import {useEffect, useState} from 'react';
import {
  GetBenUserService,
  GetUserService,
} from '../../http/getUserBYIdService/getUserBYIdService';

export const useAccountProfHome = props => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data} = await GetUserService.getUserId(props);
        setOptions(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return {options};
};

export const useBenAccountProfHome = props => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data} = await GetBenUserService.getBenUserId(props);
        setOptions(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return {options};
};
