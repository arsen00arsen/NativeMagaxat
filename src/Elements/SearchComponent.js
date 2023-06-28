import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {View, StyleSheet, Text} from 'react-native';
import Button from './Button';
import Icon from './Icon';
import DropDownFilterComponent from '../Components/FiltreComponents/DropDownFilterComponent';

const SearchComponent = ({}) => {
  const [showComponent, setShowComponent] = useState(false);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.searchContent}>
          <Ionicons name={'search'} size={25} color={'#8E8E92'} />
          <Text style={{color: '#8E8E92', fontSize: 18, marginHorizontal: 10}}>
            Search
          </Text>
        </View>
        <Button
          isTransparent
          onPress={() => setShowComponent(!showComponent)}
          style={{borderWidth: 0}}
          icon={<Icon name="filter" size={20} />}
        />
      </View>
      {showComponent && <DropDownFilterComponent />}
    </>
  );
};

export default SearchComponent;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-between',
  },
  searchContent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
  },
});
