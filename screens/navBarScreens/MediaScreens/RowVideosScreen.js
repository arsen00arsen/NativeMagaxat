import * as React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import VideoPlayer from 'react-native-video-player';
import HeaderBackSearch from '../../../components/HeaderComponents/HeaderBackSearch';
import {useSelector} from 'react-redux';
export default function RowVideosScreen(props) {
  let user = props.route.params.user;
  const {medias} = useSelector(state => state.medias);
  let content = medias.map(elem => {
    return (
      <View key={elem.id} style={styles.column}>
        <VideoPlayer
          video={{uri: elem.video_path}}
          autoplay={false}
          defaultMuted={true}
          thumbnail={require('../../../assets/logo.png')}
          style={styles.columnVideo}
        />
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <HeaderBackSearch />
      <ScrollView showsVerticalScrollIndicator={false} style={{width: '100%'}}>
        <View style={styles.column}>
          <VideoPlayer
            video={{
              uri: user.video_path,
            }}
            autoplay={false}
            defaultMuted={true}
            thumbnail={require('../../../assets/logo.png')}
            style={styles.mediaVideo}
          />
        </View>

        <View style={styles.userBody}>
          <View style={styles.imgFrame}>
            <Image source={{uri: user.user.image}} style={styles.userImage} />
          </View>
          <View style={styles.flexcontent}>
            <Text style={styles.username}>{user.user.name}</Text>
            <Text style={styles.username}>{user.user.lastname}</Text>
          </View>

          <TouchableOpacity style={styles.subScribeButton}>
            <Text style={styles.subScribeText}>Subscribe</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.userText}>{user.user.posts[0].title}</Text>
        <View style={styles.line} />
        <View style={styles.contentContainer}>{content}</View>
      </ScrollView>
    </View>
  );
}

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
  column: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
    borderRadius: 8,
    marginBottom: 40,
  },
  columnVideo: {
    alignSelf: 'center',
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  rowVideo: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
  userBody: {
    width: '100%',
    height: 107,
    backgroundColor: '#EDEDED',
    marginVertical: 20,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imgFrame: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#E6E6E6',
    width: 107,
    height: 107,
  },
  userImage: {
    width: 103,
    height: 103,
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
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginLeft: 10,
  },
  contentContainer: {
    marginBottom: 40,
  },
  mediaVideo: {
    borderRadius: 8,
  },
});
