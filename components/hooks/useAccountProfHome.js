import {useIsFocused} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {GetUserService} from '../../http/getUserBYIdService/getUserBYIdService';

export const useAccountProfHome = ({id, isSub}) => {
  const [options, setOptions] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      const fetchData = async () => {
        try {
          const {data} = await GetUserService.getUserId(id);
          setOptions(data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [isSub]);

  return {options};
};
