import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {baseUrl2} from '../../../http/index';
import SearchComponent from '../../../components/SearchComponent';
import {useTranslation} from 'react-i18next';

const BenefactorSearchPage = () => {
  const {t} = useTranslation();
  const [data, setData] = useState('');
  const [list, setList] = useState([]);
  const theme = useTheme();
  const navigation = useNavigation();

  useEffect(() => {
    const url = baseUrl2 + '/users/list?name=' + data;
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(url, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });
        const json = await response.json();
        setList(json.data.data);
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchData();
  }, [data]);

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
            <Text style={styles.itemText} numberOfLines={1}>
              {item.name}
            </Text>
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
    navigation.navigate('BenefactorUserPageScreen', {
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
        <SearchComponent setText={setData} searchText={t('searchUsers')} />
      </View>
      <FlatList
        style={styles.flatlist}
        data={list}
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

export default BenefactorSearchPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingTop: 15,
    backgroundColor: '#f7f7f7',
    height: '100%',
  },
  usersProfilemage: {
    width: 50,
    height: 50,
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
    fontSize: 18,
    marginRight: 'auto',
    fontWeight: '500',
  },
  flatlist: {
    paddingHorizontal: 15,
    width: '100%',
  },
  usersProfile: {
    marginBottom: 10,
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderBottomColor: '#E0D0BA',
  },
  usserdata: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '60%',
    overflow: 'hidden',
    flex: 1,
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
});
