import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  SectionList,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import HeaderChatSearch from '../../../components/HeaderComponents/HeaderChatSearch';
import PushNotification from 'react-native-push-notification';
import PersonsData from '../../../components/PersonsData';
import HorizontalInfinitiScroll from '../../../components/HorizontalInfinitiScroll';

const HomeScreen = () => {
  const theme = useTheme();

  useEffect(() => {
    createChanels();
  }, []);

  const createChanels = () => {
    PushNotification.createChannel({
      channelId: 'test-channel',
      channelName: 'Test Channel',
    });
  };
  return (
    <View style={styles.container}>
      <HeaderChatSearch />
      <StatusBar
        backgroundColor="#009387"
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      <SafeAreaView style={{flex: 1}}>
        <SectionList
          contentContainerStyle={{paddingHorizontal: 10}}
          stickySectionHeadersEnabled={false}
          sections={SECTIONS}
          renderSectionHeader={({section}) => (
            <PersonsData title={section.title} />
          )}
          renderItem={() => <HorizontalInfinitiScroll />}
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
  seperator: {
    width: 10,
    height: 50,
  },
});
