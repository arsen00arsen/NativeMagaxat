import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {baseUrl2} from './../http/index';
import {Picker} from '@react-native-picker/picker';

const CountryCodeList = ({navigation}) => {
  const [country, setCountry] = useState([]);
  const dispatch = useDispatch();
  const [countrySelect, setCountrySelect] = useState('');
  useEffect(() => {
    getpost();
  }, []);

  const urlPosts = baseUrl2 + '/countries';
  const getpost = async () => {
    try {
      const response = await fetch(urlPosts);
      const json = await response.json();
      setCountry(json.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <View style={styles.actionLocal}>
      <Text style={styles.inputHeaderLocation}>Location</Text>
      <Picker
        selectedValue={countrySelect}
        style={styles.pickerSelectStyles}
        onValueChange={(itemValues, itemIndex) => {
          setCountrySelect(itemValues);
          dispatch({
            type: 'USSER_SIGN_UPLOCATION',
            payload: {country: itemValues},
          });
        }}>
        {country?.map((countries, id) => {
          return <Picker.Item label={countries.name} value={id} key={id} />;
        })}
      </Picker>
    </View>
  );
};

export default CountryCodeList;

const styles = StyleSheet.create({
  actionLocal: {
    flexDirection: 'column',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#8A8A8A',
    backgroundColor: '#8A8A8A',
    width: 250,
    height: 60,
    borderRadius: 4,
    alignItems: 'flex-start',
    color: 'red',
  },
  inputHeaderLocation: {
    fontSize: 12,
    color: 'white',
    paddingTop: 10,
    paddingLeft: 12,
  },
  pickerSelectStyles: {
    width: '100%',
    height: 0,
    position: 'absolute',
    bottom: -10,
    fontSize: 8,
    left: -5,
  },
});
