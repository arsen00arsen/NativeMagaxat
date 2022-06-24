import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {baseUrl2} from '../../http';

const url = baseUrl2 + '/types';

export const useMultiSelectComponent = () => {
  const [options, setOptions] = useState([]);
  const [isItemLoading, setIsItemLoading] = useState(false);
  const user = useSelector(state => state?.user.data.interesting_type);
  const [selectedItems, setSelectedItems] = useState([]);
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
  };

  return {options, isItemLoading, onSelectedItemsChange, selectedItems};
};
