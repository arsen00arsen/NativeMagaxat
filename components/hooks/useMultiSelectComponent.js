import {useEffect, useState} from 'react';
import {baseUrl2} from '../../http';

const url = baseUrl2 + '/types';

export const useMultiSelectComponent = () => {
  const [options, setOptions] = useState([]);
  const [isItemLoading, setIsItemLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsItemLoading(true);
        await fetch(url, {
          headers: {
            Authorization:
              'Bearer ' + '10|oMlp7229KYP9nfdN2BrtCC2CjCuJIJF48fZsrV0J',
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
