import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '@react-navigation/native';
import IconPlay from 'react-native-vector-icons/AntDesign';
import {baseUrl2} from '../../../http/index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchComponent from '../../../components/SearchComponent';
import VideoPlayer from 'react-native-video-player';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {renderPosts} from '../../../stores/post/postActions';

const MediaSearch = () => {
  const [data, setData] = useState('');
  const [list, setList] = useState([]);
  const navigation = useNavigation();
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
  let userProfilePage = item => {
    navigation.navigate('RowVideosScreen', {
      user: item,
    });
  };
  const ItemRender = item => {
    return (
      <View style={styles.usersProfile}>
        <View style={styles.info}>
          <View style={styles.usserdatarow}>
            <Image
              source={{uri: item.user.image}}
              style={styles.usersProfilemage}
            />
            <View style={styles.infoContainer}>
              <View style={styles.usserdata}>
                <View style={styles.usserNames}>
                  <Text style={styles.itemText}>{item.user.name}</Text>
                  <Text style={styles.itemText}>{item.user.lastname}</Text>
                </View>
                <Text style={styles.itemText} numberOfLines={2}>
                  {item.vedioTitle}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.postContainer}>
            {/* <VideoPlayer
              uri={item.userVedio}
              autoplay={false}
              defaultMuted={true}
              thumbnail={require('../../../assets/logoHeader.png')}
              style={styles.searchVideo}
            /> */}
            {console.log(item.videos)}
            <Image style={styles.rowVideo} source={{uri: item.video_name}} />
            <IconPlay
              name="play"
              size={25}
              color="gray"
              style={styles.icPlayRow}
            />
            <MaterialCommunityIcons
              name="account-arrow-right"
              size={35}
              color="#BB9E79"
              style={styles.itemIcon}
            />
          </View>
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
          <TouchableOpacity onPress={() => userProfilePage(item)}>
            <ItemRender
              name={item.user_name}
              lastName={item.user_lastname}
              userVedio={item.video_path}
              vedioTitle={item.video_title}
              user={item.user}
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
    marginTop: Platform.OS === 'ios' ? 25 : 0,
  },
  info: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
  },
  itemTextTitle: {
    fontSize: 16,
    marginRight: 'auto',
    fontWeight: '500',
    color: '#727272',
    paddingLeft: 5,
    maxWidth: 40,
  },
  itemText: {
    fontSize: 16,
    marginRight: 'auto',
    fontWeight: '500',
    color: '#727272',
    paddingLeft: 5,
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
    maxWidth: 100,
    height: 65,
    borderRadius: 8,
  },

  usserdatarow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '55%',
  },
  paddingName: {
    paddingRight: 5,
  },
  usersProfilemage: {
    width: 40,
    height: 40,
    borderRadius: 50,
    // marginRight: 10,
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  usserNames: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  postContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '45%',
  },
  icPlayRow: {
    marginLeft: 'auto',
    marginRight: 'auto',
    left: '45%',
    top: 20,
    position: 'absolute',
  },
});
