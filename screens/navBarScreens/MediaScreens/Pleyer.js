import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import VideoPlayer from 'react-native-video-player';

export default function Pleyer(props) {
  return (
    <View style={styles.column}>
      <VideoPlayer
        // ref={videoRef}
        video={{
          uri: props?.video_path,
        }}
        autoplay={true}
        defaultMuted={false}
        style={styles.columnVideo}
        fullscreen={true}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  column: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 8,
    marginBottom: 40,
  },
  columnVideo: {
    alignSelf: 'center',
    width: '100%',
    minWidth: 330,
    height: 150,
    borderRadius: 8,
  },
});
