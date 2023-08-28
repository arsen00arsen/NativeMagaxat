import * as React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import VideoPlayer from 'react-native-video-player';

function Gallery({post}) {
  const imageArray = post?.filter(item => item.type.startsWith('image'));
  const videoArray = post?.filter(item => item.type.startsWith('video'));
  return (
    <View style={styles.container}>
      <Text style={{fontWeight: '700', marginBottom: 20}}>Gallery</Text>
      <View style={styles.imageContainer}>
        {videoArray?.map(elem => {
          return (
            <View
              style={{
                width: 350,
                height: 252,
                backgroundColor: '#C8C8C8',
                borderRadius: 8,
              }}>
              <VideoPlayer
                video={{uri: elem.url}}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 8,
                }}
                autoplay={false}
                defaultMuted={true}
                fullscreen={true}
                resizeMode="contain"
              />
            </View>
          );
        })}

        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
            marginTop: 20,
          }}>
          {imageArray?.map(elem => {
            return (
              <Image
                source={{uri: elem.url}}
                style={{
                  width: 105,
                  height: 122,
                  marginRight: 10,
                  backgroundColor: '#C8C8C8',
                  borderRadius: 8,
                }}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
}
export default Gallery;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    padding: 15,
  },
  imageContainer: {
    flexWrap: 'wrap',
  },
});
