import {useEffect, useState} from 'react';
import {
  AppearsService,
  GetBenefactorsService,
} from '../../http/getUsersService/getUsersService';

export const useGetUsers = () => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data} = await GetBenefactorsService.getBenefactors();
        setOptions(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return {options};
};

export const useGetAppearsUsers = () => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data} = await AppearsService.getAppers();
        setOptions(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return {options};
};
