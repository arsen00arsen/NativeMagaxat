import {useIsFocused} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {
  GetBenUserService,
  GetUserService,
} from '../../http/getUserBYIdService/getUserBYIdService';

export const useAccountProfHome = props => {
  const [options, setOptions] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      const fetchData = async () => {
        try {
          const {data} = await GetUserService.getUserId(props.id);
          setOptions(data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [props.isSub]);

  return {options};
};
