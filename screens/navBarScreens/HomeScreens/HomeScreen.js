import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  SectionList,
  SafeAreaView,
  StatusBar,
  Text,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import PushNotification from 'react-native-push-notification';
import LinearGradient from 'react-native-linear-gradient';
import HeaderChatSearch from '../../../components/HeaderComponents/HeaderChatSearch';
import PersonsData from '../../../components/PersonsData';
import HorizontalInfinitiScroll from '../../../components/HorizontalInfinitiScroll';
import {useDispatch, useSelector} from 'react-redux';
import {loadPosts, renderPosts} from '../../../stores/post/postActions';
import Stories from '../../../components/Storises';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loadLastMessages} from '../../../stores/messages/messageActions';

const HomeScreen = props => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [station, setSection] = useState('Users');
  const {isLoading, posts} = useSelector(state => state.post);
  const userMain = useSelector(state => state?.user);
  const [currentPage, setCurrentPage] = useState(1);
  let PusherClient;
  let echo;
  useEffect(() => {
    getToken();
  }, []);

  Pusher.logToConsole = false;
  const getToken = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      PusherClient = new Pusher('f3410ab18dff50208018', {
        appId: 'FS852Lt2GV',
        key: 'f3410ab18dff50208018',
        secret: '823ca29599dcd73c1b28',
        cluster: 'mt1',
        disableStats: true,
        encrypted: true,
        wsHost: 'magaxat.com',
        authEndpoint: 'https://magaxat.com/broadcasting/auth',
        enabledTransports: ['ws', 'wss'],
        wsPort: '443',
        forceTLS: true,
        auth: {
          headers: {
            Authorization: 'Bearer ' + token,
            Accept: 'application/json',
          },
        },
      });
      echo = new Echo({
        broadcaster: 'pusher',
        client: PusherClient ?? undefined,
      });
      echo
        ?.private(`notifications.${userMain?.user?.id}`)
        .listen('.notification', e => {
          dispatch(loadLastMessages(e));
        });
    }
  };

  const loadMoreItem = () => {
    setCurrentPage(currentPage + 1);
    dispatch(loadPosts(currentPage + 1));
  };

  useEffect(() => {
    dispatch(loadPosts(1));
  }, []);

  let content = (
    <View>
      <LinearGradient
        style={styles.lastUsersContainer}
        start={{x: 1, y: 0}}
        end={{x: 1, y: 1}}
        locations={[0.3, 0.8]}
        colors={['#E0D0BA', '#E4E3E1']}>
        <View style={styles.lastUsersContainercontent}>
          <View style={styles.lastUsersContainerSmall} />
          <TouchableOpacity
            onPress={() => setSection('Users')}
            style={[station === 'Users' ? styles.storPassive : styles.storAct]}>
            <Text style={styles.lastUsersContainerText}>Last Signed Users</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSection('Stories')}
            style={[
              station === 'Stories' ? styles.storPassive : styles.storAct,
            ]}>
            <Text style={styles.lastUsersContainerTexta}>Stories</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
      {station === 'Users' ? <PersonsData /> : <Stories />}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#009387"
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      <HeaderChatSearch />
      <SafeAreaView style={{flex: 1}}>
        <SectionList
          contentContainerStyle={{paddingHorizontal: 10}}
          stickySectionHeadersEnabled={false}
          sections={SECTIONS}
          renderSectionHeader={({section}) => content}
          renderItem={() => (
            <HorizontalInfinitiScroll
              isLoading={isLoading}
              posts={posts}
              loadMoreItem={loadMoreItem}
            />
          )}
        />
      </SafeAreaView>
    </View>
  );
};

const SECTIONS = [
  {
    title: 'Last Signed Users',
    data: [
      {
        key: '1',
      },
    ],
  },
];
export default HomeScreen;

const styles = StyleSheet.create({
  sectionHeader: {
    fontWeight: '800',
    fontSize: 18,
    color: '#f4f4f4',
    marginTop: 20,
    marginBottom: 5,
  },
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    paddingTop: 15,
    backgroundColor: '#F2F2F2',
    height: '100%',
  },
  lastUsersContainer: {
    display: 'flex',
    minWidth: '100%',
    height: 57,
    borderRadius: 8,
    position: 'relative',
    justifyContent: 'center',
    marginTop: 20,
  },
  lastUsersContainerSmall: {
    height: 30,
    width: 8,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: '#ACA093',
    marginRight: 10,
  },
  lastUsersContainerText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#838383',
    fontFamily: 'Roboto-Bold',
  },
  lastUsersContainercontent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  usersProfile: {
    width: 72,
    height: 150,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 15,
  },
  info: {
    height: 30,
    backgroundColor: '#DEDEDE',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
  lastUsersContainerTexta: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#838383',
    textAlign: 'right',
    paddingRight: 10,
  },
  seperator: {
    width: 10,
    height: 50,
  },
  storPassive: {
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 5,
    minWidth: 150,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'silver',
    backgroundColor: '#E0D0BA',
    shadowRadius: 3,
  },
  storAct: {
    height: 57,
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 5,
    minWidth: 150,
    borderRadius: 4,
  },
});
