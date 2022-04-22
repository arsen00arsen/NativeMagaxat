import React, {useState} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import SearchBar from 'react-native-dynamic-search-bar';
import * as Animatable from 'react-native-animatable';
// import TestSerachBar from './TestSerachBar';

const SearchComponent = props => {
  const navigation = useNavigation();
  const [openSearch, setopenSearch] = useState(false);

  let content;
  content = (
    <Animatable.View
      animation="bounceInDown"
      duraton="1500"
      style={styles.container}>
      <SearchBar
        fontSize={14}
        fontColor="#BB9E79"
        iconColor="#BB9E79"
        shadowColor="#282828"
        cancelIconColor="#BB9E79"
        placeholder={props.searchText}
        onChangeText={text => {
          props.setText(text);
        }}
        onPressCancel={() => {
          this.filterList();
        }}
        onPress={() => setopenSearch(!openSearch)}
        style={styles.searchbody}
      />
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.text}>Cancel</Text>
      </TouchableOpacity>
    </Animatable.View>
  );

  return <>{content}</>;
};

export default SearchComponent;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    minHeight: 40,
    marginVertical: 20,
    paddingHorizontal: 15,
  },
  searchbody: {
    width: '80%',
    height: 47,
  },
  text: {
    color: '#BB9E79',
    fontSize: 18,
    fontWeight: '500',
  },
});
