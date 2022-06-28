import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {baseUrl2} from '../../http';

const url = baseUrl2 + '/types';

export const useMultiSelectComponent = props => {
  const [options, setOptions] = useState([]);
  const [isItemLoading, setIsItemLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState(props?.interested);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        setIsItemLoading(true);
        await fetch(url, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
          .then(res => res.json())
          .then(({data}) => {
            const interestItem = {
              name: 'Interesteds',
              id: 0,
              children: data.map(el => ({
                id: el.id,
                name: el.name_en,
              })),
            };
            setOptions(prev => [...prev, interestItem]);
          });
      } catch (error) {
        console.log('error', error);
      } finally {
        setIsItemLoading(false);
      }
    };
    fetchData();
  }, []);
  const onSelectedItemsChange = selectedOption => {
    setSelectedItems(selectedOption);
    dispatch({
      type: 'INFOCHANGE_INTERESTEDS_STEP_SUBMIT',
      payload: selectedOption,
    });
  };

  return {options, isItemLoading, onSelectedItemsChange, selectedItems};
};
