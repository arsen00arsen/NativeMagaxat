import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ImageBackground,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import IconPlay from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {loadAllMedias} from '../stores/medias/mediaAction';
import {useTranslation} from 'react-i18next';

const videoWidt = Dimensions.get('window').width;
export default function MediaContent() {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [columnOrGrid, setcolumnOrGrid] = useState('column');
  const {medias} = useSelector(state => state.medias);

  useEffect(() => {
    dispatch(loadAllMedias());
  }, []);

  const changeContainer = e => {
    if (e === 'column') {
      return setcolumnOrGrid('column');
    } else {
      setcolumnOrGrid('grid');
    }
  };

  let content = medias.map(elem => {
    if (columnOrGrid === 'column') {
      return (content = (
        <View style={styles.column} key={elem?.id}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('RowVideosScreen', {
                user: elem,
              })
            }>
            <ImageBackground
              style={styles.post__content__media}
              source={{uri: elem.video_name}}
              blurRadius={90}>
              <Image
                style={styles.columnVideo}
                source={{uri: elem.video_name}}
                resizeMode={'contain'}
              />
            </ImageBackground>
            <IconPlay
              name="play"
              size={50}
              color="gray"
              style={styles.icPlay}
            />
            <View style={styles.opacity}>
              <View style={styles.rowEffect}>
                <View style={styles.imgFrame}>
                  <Image
                    source={{uri: elem.user.image}}
                    style={styles.userImage}
                  />
                </View>
                <Text style={styles.userName}>{elem?.user.name} </Text>
                <Text style={styles.userName}>{elem?.user.lastname} </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      ));
    } else {
      return (content = (
        <View key={elem.id} style={styles.columnGrid}>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('GridVediosScreen', {
                  user: elem,
                })
              }>
              <View>
                <Image
                  style={styles.rowVideo}
                  source={{uri: elem.video_name}}
                  resizeMode={'stretch'}
                />
                <IconPlay
                  name="play"
                  size={25}
                  color="gray"
                  style={styles.icPlayRow}
                />
              </View>
              <View style={styles.opacityGrid}>
                <View style={styles.rowEffect}>
                  <View style={styles.imgFrame}>
                    <Image
                      source={{uri: elem.user.image}}
                      style={styles.userImage}
                      resizeMode={'stretch'}
                    />
                  </View>
                  <View style={{display: 'flex', flexDirection: 'column'}}>
                    <Text style={styles.userName}>{elem?.user.name} </Text>
                    <Text style={styles.userName}>{elem?.user.lastname} </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ));
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Text style={styles.showAs}>{t('showAs')}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={styles.columnButton}
            onPress={() => changeContainer('column')}>
            <Icon
              name="square"
              size={22}
              color={columnOrGrid !== 'column' ? 'gray' : 'black'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.gridButton}
            onPress={() => changeContainer('grid')}>
            <Icon
              name="grid"
              size={21}
              color={columnOrGrid === 'column' ? 'gray' : 'black'}
            />
          </TouchableOpacity>
        </View>
      </View>
      {columnOrGrid === 'column' ? (
        content
      ) : (
        <View style={styles.wrapContent}>{content}</View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 80,
  },
  buttons: {
    width: '100%',
    //height: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    top: 0,
    backgroundColor: '#ccc',
    padding: 15,
    //borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 10,
  },
  post__content__media: {
    borderRadius: 1,
    overflow: 'hidden',
  },
  columnButton: {
    marginRight: 10,
  },
  gridButton: {
    marginRight: 7,
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 5,
    //borderRadius: 9,
    position: 'relative',
    borderWidth: 3,
    borderColor: '#ccc',
  },
  columnVideo: {
    alignSelf: 'center',
    width: '100%',
    height: 200,
    borderRadius: 7,
    resizeMode: 'contain',
    backgroundColor: 'transparent',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
    width: '49%',
    justifyContent: 'space-between',
    borderRadius: 8,
  },
  rowVideo: {
    width: (videoWidt - 25) / 2,
    height: 100,
    borderRadius: 8,
  },
  opacity: {
    width: '40%',
    height: 200,
    position: 'absolute',
    borderRadius: 8,
    // opacity: 0.7,
  },
  opacityGrid: {
    width: '40%',
    height: 100,
    position: 'absolute',
    borderRadius: 8,
    // opacity: 0.7,
  },
  imgFrame: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#ccc',
    width: 33,
    height: 33,
    marginTop: 'auto',
    marginHorizontal: 10,
  },
  userImage: {
    width: 30,
    height: 30,
    borderRadius: 999,
    // borderColor: '#E6E6E6',
    // borderWidth: 3,
  },
  userName: {
    color: 'black',
    fontSize: 12,
    fontWeight: '600',
  },
  rowEffect: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 'auto',
    marginBottom: 10,
    marginLeft: '5%',
    width: '90%',
  },
  wrapContent: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
  },
  icPlay: {
    marginLeft: 'auto',
    marginRight: 'auto',
    left: '45%',
    top: 70,
    position: 'absolute',
  },
  icPlayRow: {
    marginLeft: 'auto',
    marginRight: 'auto',
    left: '45%',
    top: 35,
    position: 'absolute',
  },
  columnGrid: {
    width: '48%',
    //backgroundColor: 'red',
  },
  showAs: {
    color: '#1f1f1f',
    fontSize: 12,
    fontWeight: 'bold',
    paddingLeft: 8,
    textTransform: 'uppercase',
  },
});
