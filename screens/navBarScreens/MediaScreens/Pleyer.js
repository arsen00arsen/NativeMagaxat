import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import VideoPlayer from 'react-native-video-player';

export default function Pleyer(props) {
  const [displayBlock, setdisplayBlock] = useState(false);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      setdisplayBlock(false);
    }
    return () => setdisplayBlock(true);
  }, [isFocused]);
  return (
    <View style={styles.column}>
      <ImageBackground
        style={styles.post__content__media}
        source={{uri: props?.video_Image}}
        blurRadius={90}>
        {displayBlock === false ? (
          <VideoPlayer
            video={{
              uri: props?.video_path,
            }}
            autoplay={true}
            defaultMuted={false}
            style={styles.columnVideo}
            fullscreen={true}
            // resizeMode={'cover'}
          />
        ) : null}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  column: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f7f7f7',
  },
  columnVideo: {
    alignSelf: 'center',
    width: '100%',
    //height: '100%',
    // minWidth: 330,
    height: 200,
    backgroundColor: 'transparent',
  },
});
