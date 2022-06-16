import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, StatusBar, FlatList} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {baseUrl2} from '../../../http/index';
import MaterialCommunityIcons from 'react-native-vector-icons/Ionicons';
import SearchComponent from '../../../components/SearchComponent';
import VideoPlayer from 'react-native-video-player';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {renderPosts} from '../../../stores/post/postActions';

const MediaSearch = () => {
  const [data, setData] = useState('');
  const [list, setList] = useState([]);
  const theme = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    const url = baseUrl2 + '/videos_api?title=' + data;
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
        dispatch(renderPosts());
      } catch (error) {
        'error', error;
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
          <VideoPlayer
            uri={item.userVedio}
            autoplay={false}
            defaultMuted={true}
            thumbnail={require('../../../assets/logoHeader.png')}
            style={styles.searchVideo}
          />
          <View style={styles.usserdata}>
            <Text style={styles.itemText}>{item.vedioTitle}</Text>
            <View style={styles.usserdatarow}>
              <Text style={[styles.itemText, styles.paddingName]}>
                {item.name}
              </Text>
              <Text style={styles.itemText}>{item.lastName}</Text>
            </View>
          </View>
          <MaterialCommunityIcons
            name="checkmark-done-circle"
            size={30}
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
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#009387"
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      <View style={styles.serachContainer}>
        <SearchComponent
          setText={setData}
          searchText="Search Media by title ..."
          underlineColorAndroid="white"
        />
      </View>
      <FlatList
        style={styles.flatlist}
        data={list?.data?.data}
        renderItem={({item}) => (
          <ItemRender
            name={item.user_name}
            lastName={item.user_lastname}
            userVedio={item.video_path}
            vedioTitle={item.video_title}
          />
        )}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={Separator}
        vertical={true}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default MediaSearch;

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
  },
  usersProfilemage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 30,
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
    // paddingHorizontal: 15,
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
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 20,
  },
  itemIcon: {
    marginLeft: 'auto',
    marginBottom: 'auto',
  },
  serachContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  searchVideo: {
    maxWidth: 150,
    maxHeight: 90,
    borderRadius: 8,
  },
  usserdatarow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  paddingName: {
    paddingRight: 5,
  },
});
