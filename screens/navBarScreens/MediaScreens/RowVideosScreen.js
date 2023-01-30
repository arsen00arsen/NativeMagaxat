import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import IconPlay from 'react-native-vector-icons/AntDesign';
import HeaderBackSearch from '../../../components/HeaderComponents/HeaderBackSearch';
import {useSelector} from 'react-redux';
import Pleyer from './Pleyer';
import {useTranslation} from 'react-i18next';
import {UserSubscribe} from '../../../http/isLiked/isLiked';

export default function RowVideosScreen(props) {
  const {t} = useTranslation();
  let user = props?.route.params.user;
  const {medias} = useSelector(state => state?.medias);
  const navigation = useNavigation();
  const isSub = user?.user.subscribed;
  const [isSubscribe, setIssub] = useState(isSub);
  const myUser = useSelector(state => state?.user);
  const subButton = async () => {
    try {
      const {data} = await UserSubscribe.isSubscribe(user?.user?.id);
      console.log(data);
      setIssub(data.subscribed);
    } catch (error) {
      console.log(error);
    }
  };

  let content = medias.map(elem => {
    return (
      <View key={elem.id} style={styles.column}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('RowVideosScreen', {
              user: elem,
            })
          }>
          <View style={styles.post__content__media}>
            <ImageBackground source={{uri: elem.video_name}} blurRadius={90}>
              <Image
                source={{uri: elem.video_name}}
                style={styles.rowVideo}
                resizeMode={'contain'}
              />
            </ImageBackground>
          </View>
          <IconPlay
            name="play"
            size={45}
            color="gray"
            style={styles.icPlayRow}
          />
        </TouchableOpacity>
      </View>
    );
  });
  console.log(isSubscribe, 'ooo');
  return (
    <View style={styles.container}>
      <HeaderBackSearch serachFalse="false" />
      <View>
        <View style={[styles.column]}>
          <Pleyer video_path={user.video_path} video_Image={user.video_name} />
        </View>
        <View style={{height: '70%'}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{width: '100%', height: '100%'}}>
            <View style={styles.userBody}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('AccounProfiletScreen', {
                      id: user?.user?.id,
                    })
                  }>
                  <View style={styles.imgFrame}>
                    <Image
                      source={{uri: user?.user?.image}}
                      style={styles.userImage}
                    />
                  </View>
                </TouchableOpacity>
                <View style={styles.flexcontent}>
                  <Text style={styles.username}>{user?.user?.name} </Text>
                  <Text style={styles.username}>{user?.user?.lastname}</Text>
                </View>
              </View>
              {myUser?.user?.id !== user?.user?.id ? (
                <TouchableOpacity
                  onPress={subButton}
                  style={{
                    paddingHorizontal: 30,
                    backgroundColor: '#A48A66',
                    paddingVertical: 10,
                    marginRight: 10,
                    borderRadius: 8,
                  }}>
                  <Text style={{color: 'white'}}>
                    {isSubscribe === false ? t('subscribe') : t('unSubscribe')}
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
            <View style={styles.contentContainer}>{content}</View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#f7f7f7',
  },
  column: {
    // height: '30%',
    flexDirection: 'column',
  },
  rowVideo: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  post__content__media: {
    overflow: 'hidden',
    borderTopColor: '#606163',
    borderTopWidth: 1,
    borderBottomColor: '#606163',
    borderBottomWidth: 1,
    marginBottom: 5,
  },
  userBody: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: '#ccccccb5',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },
  imgFrame: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#E6E6E6',
    width: 57,
    height: 57,
    marginLeft: 10,
  },
  userImage: {
    width: 53,
    height: 53,
    borderRadius: 999,
    borderColor: '#E6E6E6',
    borderWidth: 3,
  },
  username: {
    color: '#727272',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 'auto',
  },
  subScribeButton: {
    backgroundColor: '#BB9E79',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 117,
    height: 43,
    borderRadius: 5,
    marginHorizontal: 40,
  },
  subScribeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  userText: {
    fontSize: 16,
    color: '#383838',
    textAlign: 'left',
    marginBottom: 20,
  },
  line: {
    borderWidth: 1,
    borderColor: '#E6E6E6',
    width: '100%',
  },
  flexcontent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginLeft: 10,
  },
  contentContainer: {
    marginBottom: 40,
    height: '100%',
  },
  mediaVideo: {
    borderRadius: 8,
  },
  icPlayRow: {
    marginLeft: 'auto',
    marginRight: 'auto',
    left: '45%',
    top: '38%',
    position: 'absolute',
  },
});
