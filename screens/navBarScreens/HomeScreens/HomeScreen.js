import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  SectionList,
  SafeAreaView,
  StatusBar,
  Text,
  RefreshControl,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import HeaderChatSearch from '../../../components/HeaderComponents/HeaderChatSearch';
import PersonsData from '../../../components/PersonsData';
import HorizontalInfinitiScroll from '../../../components/HorizontalInfinitiScroll';
import {loadPosts} from '../../../stores/post/postActions';
import Stories from '../../../components/Storises';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useIsFocused} from '@react-navigation/native';
import {messagesCount} from '../../../stores/messages/messageActions';

const HomeScreen = props => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isFocused = useIsFocused();
  const [station, setSection] = useState('Users');
  const {isLoading, posts} = useSelector(state => state.post);
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const newMsg = useSelector(state => state?.messages?.allNewMessages);
  const messagecount = useSelector(state => state?.messages?.messageCount);
  const loadMoreItem = () => {
    setCurrentPage(currentPage + 1);
    dispatch(loadPosts(currentPage + 1));
  };

  useEffect(() => {
    if (isFocused) {
      dispatch(messagesCount());
    }
  }, [newMsg, isFocused]);

  useEffect(() => {
    if (isFocused) {
      dispatch(loadPosts(1));
    }
  }, [isFocused, refreshing]);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1500).then(() => setRefreshing(false));
  }, []);
  let content = (
    <View style={styles.titleContainer}>
      <View style={styles.lastUsersContainer}>
        <View style={styles.lastUsersContainercontent}>
          <View style={{flex: 2}}>
            <TouchableOpacity
              style={[
                styles.header__tab__style,
                station === 'Users' && styles.tab__active__style,
              ]}
              onPress={() => setSection('Users')}>
              <Text style={[styles.header__text__style]}>{t('newUsers')}</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 2}}>
            <TouchableOpacity
              style={[
                styles.header__tab__style,
                station === 'Stories' && styles.tab__active__style,
              ]}
              onPress={() => setSection('Stories')}>
              <Text style={styles.header__text__style}>{t('newStories')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {station === 'Users' ? <PersonsData /> : <Stories />}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#FFFFFF"
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      <HeaderChatSearch count={messagecount} />
      <SafeAreaView style={{flex: 1}}>
        <SectionList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#E4E3E1']}
            />
          }
          contentContainerStyle={{paddingHorizontal: 0}}
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
    title: 'Last Users',
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
    paddingHorizontal: 0,
    paddingTop: 15,
    backgroundColor: '#f7f7f7',
    height: '100%',
  },
  lastUsersContainer: {
    display: 'flex',
    minWidth: '100%',
    height: 57,
    //borderRadius: 8,
    backgroundColor: '#fff',
    position: 'relative',
    justifyContent: 'space-between',
    // marginTop: 0,
  },
  lastUsersContainerSmall: {
    // height: 35,
    // width: 5,
    // borderBottomRightRadius: 8,
    // borderTopRightRadius: 8,
    // backgroundColor: '#ACA093',
  },
  lastUsersContainerText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    // fontFamily: 'Roboto-Bold',
  },
  lastUsersContainercontent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 's',
    height: '100%',
    width: '100%',
    flex: 1,
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
    textAlign: 'center',
    paddingRight: 10,
  },
  seperator: {
    width: 10,
    height: 50,
  },
  storPassive: {
    //height: 30,
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 5,
    minWidth: 150,
    borderRadius: 4,
    // borderWidth: 1,
    // borderColor: '#e8e8e8e8',
    backgroundColor: '#413c362b',
    paddingVertical: 8,
    shadowRadius: 3,
    marginLeft: 15,
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
  header__text__style: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '800',
    color: '#606163',
  },
  header__tab__style: {
    width: '100%',
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 4,
    borderBottomColor: 'rgba(255, 255, 255, 0)',
  },
  tab__active__style: {
    borderBottomColor: '#838383',
  },
});
