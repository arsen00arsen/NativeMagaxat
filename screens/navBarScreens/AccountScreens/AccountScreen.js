import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  SectionList,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import HeaderBackSearch from '../../../components/HeaderComponents/HeaderBackSearch';
import {useAccountProfHome} from '../../../components/hooks/useAccountProfHome';
import {UserSubscribe} from '../../../http/isLiked/isLiked';
import HorizontalInfinitiScroll from '../../../components/HorizontalInfinitiScroll';
import {loadPostsUser} from '../../../stores/post/postActions';
import RadiusButton from '../../../components/RadiusButton';

// import {useSelector} from 'react-redux';
const AccountScreen = props => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [isSub, setIssub] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const navigation = useNavigation();
  let id = props.route?.params.user.id;
  const {options} = useAccountProfHome({id, isSub});
  const {isLoading, posts} = useSelector(state => state.post);
  let user = options.data;
  let isS = options.subscribed;
  useEffect(() => {
    dispatch(loadPostsUser({currentPage: currentPage, id: id}));
  }, []);
  const loadMoreItem = () => {
    setCurrentPage(currentPage + 1);
    dispatch(loadPostsUser({currentPage: currentPage + 1, id: id}));
  };
  const subButton = async () => {
    try {
      const {data} = await UserSubscribe.isSubscribe(id);
      setIssub(data);
    } catch (error) {
      console.log(error);
    }
  };

  let content = (
    <>
      <View style={styles.userInfo}>
        <Image source={{uri: user?.image}} style={styles.userImage} />
        <View style={styles.usernameIcon}>
          <View style={styles.names}>
            <Text style={styles.nameSurname}>{user?.name}</Text>
            <Text style={styles.nameSurname}>{user?.lastname}</Text>
          </View>
          {isS === true ? (
            <Icon name="shield-checkmark-sharp" size={24} color="#AF9065" />
          ) : null}
        </View>
      </View>
      <View style={styles.textBody}>
        <Text style={styles.text}>{user?.organisation_description}</Text>
        <View style={styles.postSubscribeBody}>
          <View style={styles.postSubscribeCounts}>
            <View style={styles.post}>
              <Text style={styles.postCount}>{user?.posts.data.length}</Text>
              <Text style={styles.postText}>Posts</Text>
            </View>
            <View style={styles.post}>
              <Text style={styles.postCount}>{user?.subscribers.length}</Text>
              <Text style={styles.postText}>Subscribers</Text>
            </View>
            <View style={styles.post}>
              <Text style={styles.postCount}>{user?.subscriptions.length}</Text>
              <Text style={styles.postText}>Subscribing</Text>
            </View>
          </View>
          <View style={styles.postSubscribeButtons}>
            <TouchableOpacity
              style={styles.postSubscribeButton}
              onPress={subButton}>
              {isS === true ? (
                <Text style={styles.postSubscribeButtonText}>Unsubscribe</Text>
              ) : (
                <Text style={styles.postSubscribeButtonText}>Subscribe</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.postSubscribeButton}
              onPress={() =>
                navigation.navigate('Chat', {
                  uid: id,
                  image: user.image,
                  name: user.name,
                  isBlocket: false,
                })
              }>
              <Text style={styles.postSubscribeButtonText}>Message</Text>
            </TouchableOpacity>
            <View style={{marginBottom: -40}}>
              <RadiusButton types="user" id={id} />
            </View>
          </View>
        </View>
      </View>
    </>
  );
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#FFFFFF"
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      <HeaderBackSearch serachFalse="false" />
      <SectionList
        style={{width: '100%'}}
        // contentContainerStyle={{paddingHorizontal: 10}}
        stickySectionHeadersEnabled={false}
        sections={SECTIONS}
        renderSectionHeader={({section}) => content}
        renderItem={() => (
          <HorizontalInfinitiScroll
            isLoading={isLoading}
            posts={posts}
            loadMoreItem={loadMoreItem}
            from="Account"
          />
        )}
      />
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
export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
    paddingTop: 15,
    backgroundColor: '#F2F2F2',
    height: '100%',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userImage: {
    width: 170,
    height: 170,
    borderRadius: 80,
    marginVertical: 30,
  },
  usernameIcon: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  nameSurname: {
    color: '#727272',
    fontSize: 24,
    textAlign: 'left',
    marginRight: 10,
  },
  idNumber: {
    color: '#000000',
    fontSize: 18,
    textAlign: 'left',
  },
  textBody: {
    width: '100%',
    marginVertical: 30,
  },
  text: {
    color: '#919191',
    fontSize: 12,
    textAlign: 'justify',
  },
  contentVideo: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    width: '49%',
    borderRadius: 8,
    marginBottom: 5,
  },
  video: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
  postSubscribeBody: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  postSubscribeCounts: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 30,
  },
  post: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postCount: {
    color: '#535353',
    fontSize: 18,
  },
  postText: {
    color: '#535353',
    fontSize: 15,
  },
  postSubscribeButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  postSubscribeButton: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#BB9E79',
    borderRadius: 5,
    width: '43%',
    height: 43,
    justifyContent: 'center',
  },
  postSubscribeButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '400',
  },
  names: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginRight: 30,
  },
});
