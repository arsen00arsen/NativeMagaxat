import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import UserService from '../../http/Account/account';

const CategoryFiltre = ({setCategoryId, catId}) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories();
  }, []);
  const getCategories = async () => {
    try {
      const {data} = await UserService.getCategories();
      setCategories(data.data);
    } catch (err) {}
  };
  return (
    <View style={styles.container}>
      {categories.map(elem => {
        return (
          <Pressable
            onPress={() => setCategoryId(elem.key)}
            key={elem.key}
            style={styles.button}>
            <View style={styles.radioInput}>
              {elem.key === catId && <View style={styles.radioInputChild} />}
            </View>
            <Text>{elem.value}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default CategoryFiltre;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: '#CCD1D2',
    flexDirection: 'row',
  },
  radioInput: {
    width: 20,
    height: 20,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  radioInputChild: {
    width: 10,
    height: 10,
    backgroundColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
  },
});
