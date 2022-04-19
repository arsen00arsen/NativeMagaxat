import * as React from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import VideoPlayer from 'react-native-video-player';

export default function MediaContent() {
  const navigation = useNavigation();
  //   const [status, setStatus] = React.useState({});
  const [columnOrGrid, setcolumnOrGrid] = React.useState('column');

  const ANIMAL_NAMES = [
    {
      id: 1,
      userVedio: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    },
    {
      id: 2,
      userVedio: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    },
    {
      id: 3,
      userVedio: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    },
    {
      id: 4,
      userVedio: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    },
    {
      id: 5,
      userVedio: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    },
    {
      id: 6,
      userVedio: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    },
    {
      id: 7,
      userVedio: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    },
  ];

  const changeContainer = e => {
    if (e === 'column') {
      return setcolumnOrGrid('column');
    } else {
      setcolumnOrGrid('grid');
    }
  };

  let content = ANIMAL_NAMES.map(elem => {
    if (columnOrGrid === 'column') {
      return (content = (
        <View key={elem.id} style={styles.column}>
          <TouchableOpacity
            onPress={() => navigation.navigate('RowVideosScreen')}>
            <VideoPlayer
              uri={elem.userVedio}
              autoplay={false}
              defaultMuted={true}
              thumbnail={require('../assets/logoHeader.png')}
              style={styles.columnVideo}
            />
            <View style={styles.opacity}>
              <View style={styles.rowEffect}>
                <View style={styles.imgFrame}>
                  <Image
                    source={require('../assets/Nikol.png')}
                    style={styles.userImage}
                  />
                </View>
                <Text style={styles.userName}>Nikol Pashinyan</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      ));
    } else {
      return (content = (
        <TouchableOpacity
          onPress={() => navigation.navigate('GridVediosScreen')}
          style={styles.row}
          key={elem.id}>
          <VideoPlayer
            uri={elem.userVedio}
            autoplay={false}
            defaultMuted={true}
            thumbnail={require('../assets/logoHeader.png')}
            style={styles.rowVideo}
          />
          <View style={styles.opacityGrid}>
            <View style={styles.rowEffect}>
              <View style={styles.imgFrame}>
                <Image
                  source={require('../assets/Nikol.png')}
                  style={styles.userImage}
                />
              </View>
              <Text style={styles.userName}>Nikol Pashinyan</Text>
            </View>
          </View>
        </TouchableOpacity>
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
    minWidth: 180,
    height: 100,
    borderRadius: 8,
  },
  opacity: {
    width: '100%',
    height: 200,
    position: 'absolute',
    borderRadius: 8,
    opacity: 0.7,
  },
  opacityGrid: {
    width: '100%',
    height: 100,
    position: 'absolute',
    borderRadius: 8,
    opacity: 0.7,
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
    color: '#FFFFFF',
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
  },
  wrapContent: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
