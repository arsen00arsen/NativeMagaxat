import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import IconPlay from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import VideoPlayer from 'react-native-video-player';
import {useDispatch, useSelector} from 'react-redux';
import {loadAllMedias} from '../stores/medias/mediaAction';

export default function MediaContent() {
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
            <View style={{position: 'relative'}}>
              <Image
                style={styles.columnVideo}
                source={{uri: elem.video_name}}
              />
              <IconPlay
                name="play"
                size={50}
                color="gray"
                style={styles.icPlay}
              />
            </View>
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
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('GridVediosScreen', {
                user: elem,
              })
            }
            style={styles.row}>
            <View style={{position: 'relative'}}>
              <Image style={styles.rowVideo} source={{uri: elem.video_name}} />
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
      ));
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
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
    marginTop: 40,
  },
  buttons: {
    width: '100%',
    height: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    top: 0,
  },
  columnButton: {
    marginRight: 40,
    width: 30,
    height: 30,
  },
  gridButton: {
    width: 30,
    height: 30,
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
    borderRadius: 8,
    position: 'relative',
  },
  columnVideo: {
    alignSelf: 'center',
    width: '100%',
    height: 200,
    borderRadius: 8,
    resizeMode: 'contain',
    backgroundColor: 'black',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    width: '49%',
    borderRadius: 8,
  },
  rowVideo: {
    width: '100%',
    minWidth: 160,
    height: 100,
    borderRadius: 8,
  },
  opacity: {
    width: '100%',
    height: 200,
    position: 'absolute',
    borderRadius: 8,
    // opacity: 0.7,
  },
  opacityGrid: {
    width: '100%',
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
    borderColor: '#E6E6E6',
    width: 33,
    height: 33,
    marginTop: 'auto',
    marginHorizontal: 10,
  },
  userImage: {
    width: 30,
    height: 30,
    borderRadius: 999,
    borderColor: '#E6E6E6',
    borderWidth: 3,
  },
  userName: {
    color: 'white',
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
    justifyContent: 'space-between',
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
  },
});
