import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import Button from './Button';
import Icon from './Icon';
import DropDownFilterComponent from '../Components/FiltreComponents/DropDownFilterComponent';
import {useNavigation} from '@react-navigation/native';

const SearchComponent = ({
  isFreandsScreen,
  setCategoryId,
  categoryId,
  categoryAge,
  setCategoryAge,
  setCategorycategoryCountry,
  categoryCountry,
}) => {
  const [showComponent, setShowComponent] = useState(false);
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.container}>
        <Pressable
          style={styles.searchContent}
          onPress={() =>
            navigation.navigate(
              isFreandsScreen ? 'FreandSearch' : 'PatronsSearch',
            )
          }>
          <Ionicons name={'search'} size={25} color={'#8E8E92'} />
          <Text style={{color: '#8E8E92', fontSize: 18, marginHorizontal: 10}}>
            Search
          </Text>
        </Pressable>
        <Button
          isTransparent
          onPress={() => setShowComponent(!showComponent)}
          style={{borderWidth: 0}}
          icon={<Icon name="filter" size={20} />}
        />
      </View>
      {showComponent && (
        <DropDownFilterComponent
          setCategoryId={setCategoryId}
          isCategory={isFreandsScreen ? false : true}
          catId={categoryId}
          categoryAge={categoryAge}
          setCategoryAge={setCategoryAge}
          setCategorycategoryCountry={setCategorycategoryCountry}
          categoryCountry={categoryCountry}
        />
      )}
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
    borderBottomColor: 'silver',
    borderBottomWidth: 1,
  },
  searchContent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
  },
});
