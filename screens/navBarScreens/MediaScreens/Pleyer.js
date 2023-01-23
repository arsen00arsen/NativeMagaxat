import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import VideoPlayer from 'react-native-video-player';

export default function Pleyer(props) {
  return (
    <View style={styles.column}>
      <VideoPlayer
        video={{
          uri: props?.video_path,
        }}
        autoplay={true}
        defaultMuted={false}
        style={styles.columnVideo}
        fullscreen={true}
        resizeMode={'stretch'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
  columnVideo: {
    alignSelf: 'center',
    width: '100%',
    minWidth: 330,
    height: 200,
  },
});
