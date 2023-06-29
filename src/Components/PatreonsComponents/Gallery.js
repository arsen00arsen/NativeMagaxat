import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';

function Gallery() {
  return (
    <View style={styles.container}>
      <Text style={{fontWeight: 700, marginBottom: 20}}>Gallery</Text>
      <View style={styles.imageContainer}>
        <View
          style={{
            width: 350,
            height: 122,
            backgroundColor: '#C8C8C8',
            borderRadius: 8,
          }}
        />
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <View
            style={{
              width: 120,
              height: 122,
              backgroundColor: '#C8C8C8',
              borderRadius: 8,
            }}
          />
          <View
            style={{
              width: 210,
              height: 122,
              backgroundColor: '#C8C8C8',
              borderRadius: 8,
            }}
          />
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <View
            style={{
              width: 105,
              height: 122,
              backgroundColor: '#C8C8C8',
              borderRadius: 8,
            }}
          />
          <View
            style={{
              width: 105,
              height: 122,
              backgroundColor: '#C8C8C8',
              borderRadius: 8,
            }}
          />
          <View
            style={{
              width: 105,
              height: 122,
              backgroundColor: '#C8C8C8',
              borderRadius: 8,
            }}
          />
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
