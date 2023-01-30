import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import IconPlay from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import HeaderBackSearch from '../../../components/HeaderComponents/HeaderBackSearch';
import Pleyer from './Pleyer';
import {useTranslation} from 'react-i18next';
import {UserSubscribe} from '../../../http/isLiked/isLiked';

export default function GridVediosScreen(props) {
  const {t} = useTranslation();
  let user = props.route.params.user;
  const navigation = useNavigation();
  const {medias} = useSelector(state => state.medias);
  const videoRef = React.useRef(null);

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
      <View style={styles.row} key={elem.id}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('GridVediosScreen', {
              user: elem,
            })
          }>
          <Image source={{uri: elem.video_name}} style={styles.rowVideo} />
          <IconPlay
            name="play"
            size={25}
            color="gray"
            style={styles.icPlayRow}
          />
        </TouchableOpacity>
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <HeaderBackSearch serachFalse="false" />
      <View style={styles.column}>
        <Pleyer video_path={user.video_path} />
      </View>
      <View tyle={{height: '70%'}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{width: '100%', height: '100%'}}>
          <View>
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
            <View style={styles.flexWrap}>{content}</View>
          </View>
        </ScrollView>
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
  row: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    width: '49%',
    borderRadius: 8,
    paddingHorizontal: 5,
  },
  rowVideo: {
    width: '100%',
    minWidth: 170,
    height: 100,
    borderRadius: 8,
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 8,
  },
  columnVideo: {
    alignSelf: 'center',
    width: '100%',
    minWidth: 330,
    height: 150,
    borderRadius: 8,
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
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginLeft: 10,
  },
  flexWrap: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  icPlayRow: {
    marginLeft: 'auto',
    marginRight: 'auto',
    left: '45%',
    top: 35,
    position: 'absolute',
  },
});
