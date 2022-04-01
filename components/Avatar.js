import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {launchImageLibrary} from 'react-native-image-picker';
import {View} from 'react-native-animatable';

const Avatar = () => {
  const [pickerResponse, setPickerResponse] = useState(null);

  const openGallery = () => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };
    launchImageLibrary(options, setPickerResponse);
  };

  const uri = pickerResponse?.assets && pickerResponse.assets[0].uri;

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <View style={styles.imageBody}>
        {uri && <Image source={{uri}} style={styles.image} />}
        <TouchableOpacity onPress={openGallery} style={styles.uploadButton}>
          <Feather
            style={styles.cameraIcon}
            name="camera"
            color="white"
            size={20}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Avatar;
const styles = StyleSheet.create({
  backgroundStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 143,
    height: 143,
    borderRadius: 9999,
  },
  imageBody: {
    borderWidth: 4,
    borderColor: '#E5E5E5',
    borderRadius: 9999,
    position: 'relative',
    width: 150,
    height: 150,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButton: {
    backgroundColor: '#3C3835',
    position: 'absolute',
    bottom: 0,
    width: 142,
    height: 70,
    borderBottomLeftRadius: 999,
    borderBottomRightRadius: 999,
    opacity: 0.3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
