import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import SearchBar from 'react-native-dynamic-search-bar';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Feather';
// import TestSerachBar from './TestSerachBar';

const SearchComponent = props => {
  const navigation = useNavigation();
  const [openSearch, setopenSearch] = React.useState(false);

  const openToggle = () => {
    setopenSearch(!openSearch);
  };

  let content;

  content = (
    <Animatable.View
      animation="bounceInDown"
      duraton="1500"
      style={styles.container}>
      <SearchBar
        placeholder="Search here"
        height={50}
        onChangeText={text => {
          props.setText(text);
        }}
        onPressCancel={() => {
          this.filterList('');
        }}
        onPress={() => setopenSearch(false)}
      />
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
  },
  searchbody: {
    width: '100%',
    height: 47,
    borderColor: 'silver',
    borderWidth: 1,
  },
});
