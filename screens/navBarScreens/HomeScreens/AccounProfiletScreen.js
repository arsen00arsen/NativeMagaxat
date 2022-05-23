import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderBackSearch from '../../../components/HeaderComponents/HeaderBackSearch';
import {baseUrl2} from '../../../http/index';
import {useSelector} from 'react-redux';

const AccounProfiletScreen = () => {
  const [data, setData] = useState('');
  const id = useSelector(state => state.usser.usserAccountId);
  const theme = useTheme();
  let i = id.toString();

  useEffect(() => {
    const url = baseUrl2 + '/users/list/' + i;
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchData();
  }, []);

  let user = data.data !== undefined ? data.data[0] : null;
  let img;
  if (user?.image !== null) {
    img = {uri: user?.image};
  } else {
    img = require('../../../assets/defoult.png');
  }
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#009387"
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      <HeaderBackSearch />
      <ScrollView style={{width: '100%'}} showsVerticalScrollIndicator={false}>
        <View style={styles.userInfo}>
          <Image source={img} style={styles.userImage} />
          <View style={styles.usernameIcon}>
            <Text style={styles.nameSurname}>{user?.name}</Text>
            <Text style={styles.nameSurname}>{user?.last_name}</Text>
            <Icon name="shield-checkmark-sharp" size={24} color="#AF9065" />
          </View>
        </View>
        <View style={styles.textBody}>
          <Text style={styles.text}>{user?.organisation_description}</Text>
          <View style={styles.postSubscribeBody}>
            <View style={styles.postSubscribeCounts}>
              <View style={styles.post}>
                <Text style={styles.postCount}>{user?.posts_count}</Text>
                <Text style={styles.postText}>Posts</Text>
              </View>
              <View style={styles.post}>
                <Text style={styles.postCount}>{user?.subscribers_count}</Text>
                <Text style={styles.postText}>Subscribers</Text>
              </View>
              <View style={styles.post}>
                <Text style={styles.postCount}>{user?.subscription_count}</Text>
                <Text style={styles.postText}>Subscribing</Text>
              </View>
            </View>
            <View style={styles.postSubscribeButtons}>
              <TouchableOpacity style={styles.postSubscribeButton}>
                <Text style={styles.postSubscribeButtonText}>Subscribe</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.postSubscribeButton}>
                <Text style={styles.postSubscribeButtonText}>Message</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* <View style={styles.contentVideo}>{videoContent}</View> */}
      </ScrollView>
    </View>
  );
};

export default AccounProfiletScreen;

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
    width: 107,
    height: 107,
    borderRadius: 80,
    marginBottom: 15,
  },
  usernameIcon: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameSurname: {
    color: '#727272',
    fontSize: 24,
    textAlign: 'left',
    marginHorizontal: 30,
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
    width: '48%',
    height: 43,
    justifyContent: 'center',
  },
  postSubscribeButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '400',
  },
});
