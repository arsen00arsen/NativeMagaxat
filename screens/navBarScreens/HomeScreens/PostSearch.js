import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {baseUrl2} from '../../../http/index';
import SearchComponent from '../../../components/SearchComponent';

const PostSearch = () => {
  const [data, setData] = useState('');
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const theme = useTheme();
  const navigation = useNavigation();

  useEffect(() => {
    const url = baseUrl2 + '/users/list?name' + data;
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(url, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });
        const json = await response.json();
        setList(json);
      } catch (error) {
        'error', error;
      }
    };
    fetchData();
  }, [data]);
  const loadMoreItem = () => {
    setCurrentPage(currentPage + 1);
  };
  const ItemRender = item => {
    let img;
    if (item.userImage !== undefined) {
      img = {uri: item.userImage};
    } else {
      img = require('../../../assets/defoult.png');
    }
    return (
      <View style={styles.usersProfile}>
        <View style={styles.info}>
          <Image source={img} style={styles.usersProfilemage} />
          <View style={styles.usserdata}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={styles.itemText}>{item.lastName}</Text>
          </View>
          <MaterialCommunityIcons
            name="account-arrow-right"
            size={35}
            color="#BB9E79"
            style={styles.itemIcon}
          />
        </View>
      </View>
    );
  };

  const Separator = () => {
    return <View style={styles.seperator} />;
  };

  let userProfilePage = item => {
    navigation.navigate('AccounProfiletScreen', {
      id: item.id,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#FFFFFF"
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      <View style={styles.serachContainer}>
        <SearchComponent setText={setData} searchText={'Search users  ...'} />
      </View>
      <FlatList
        style={styles.flatlist}
        data={list.data}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => userProfilePage(item)}>
            <ItemRender
              name={item.name}
              lastName={item.last_name}
              userImage={item.image}
            />
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={Separator}
        vertical={true}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default PostSearch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 15,
    backgroundColor: '#F2F2F2',
    height: '100%',
    marginTop: Platform.OS === 'ios' ? 23 : 0,
  },
  usersProfilemage: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 10,
  },
  info: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
  },
  itemText: {
    fontSize: 14,
    marginRight: 'auto',
    fontWeight: '500',
    color: '#727272',
    paddingLeft: 5,
  },
  flatlist: {
    paddingHorizontal: 15,
    width: '100%',
  },
  usersProfile: {
    marginBottom: 20,
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderBottomColor: '#E0D0BA',
  },
  usserdata: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemIcon: {
    marginLeft: 'auto',
  },
  serachContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  usersPost: {
    height: 64,
    width: 100,
    marginLeft: 10,
  },
  postContainer: {
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  infoContainer: {
    width: '40%',
  },
  icPlayRow: {
    marginLeft: 'auto',
    marginRight: 'auto',
    left: '45%',
    top: 20,
    position: 'absolute',
  },
});
