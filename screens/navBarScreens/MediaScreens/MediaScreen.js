import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import HeaderBackSearchSecond from '../../../components/HeaderComponents/HeaderBackSearchSecond';
import Icon from 'react-native-vector-icons/Entypo';
// import {useSelector} from 'react-redux';
import MediaContent from '../../../components/MediaContent';
import ImagePicker from 'react-native-image-crop-picker';
const MediaScreen = ({navigation}) => {
  const theme = useTheme();
  const [text, onChangeText] = useState('');
  const [image, setImage] = useState(null);

  const pickPicture = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
    });
  };

  const pickVedio = () => {
    ImagePicker.openPicker({
      mediaType: 'video',
    }).then(video => {
      console.log(video);
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#009387"
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      <HeaderBackSearchSecond pageTo={'MediaSearch'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.postContainer}>
          <View style={styles.postBody}>
            <View style={styles.addPost}>
              <View style={styles.imgBody}>
                <Image
                  style={styles.img}
                  source={require('../../../assets/Nikol.png')}
                />
              </View>
              <SafeAreaView>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeText}
                  value={text}
                  placeholder={'Type your post message ...'}
                />
              </SafeAreaView>
            </View>
            <View style={styles.addImgVedio}>
              <TouchableOpacity style={styles.postImg} onPress={pickPicture}>
                <Icon name="camera" size={24} color="#B9B9B9" />
                <Text style={styles.textAdd}>Add Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.postVedio} onPress={pickVedio}>
                <Icon name="video-camera" size={24} color="#B9B9B9" />
                <Text style={styles.textAdd}>Add Vedio</Text>
              </TouchableOpacity>
            </View>
          </View>
          <MediaContent />
          <View style={styles.contentStyle}>
            {image && <Image source={{uri: image}} style={styles.vedioImg} />}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default MediaScreen;

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
  postContainer: {
    width: '100%',
    height: '90%',
  },
  postBody: {
    width: '100%',
    height: 125,
    backgroundColor: '#E8E5E1',
    borderRadius: 8,
  },
  addPost: {
    padding: 18,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '65%',
  },
  imgBody: {
    width: 71,
    height: 71,
    borderColor: 'silver',
    borderWidth: 4,
    borderRadius: 50,
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  img: {
    position: 'absolute',
    width: 65,
    height: 65,
    borderRadius: 50,
  },
  input: {
    color: 'black',
    fontSize: 14,
  },
  addImgVedio: {
    height: '35%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  postImg: {
    width: '50%',
    height: '100%',
    backgroundColor: '#DEDCDC',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRightWidth: 2,
    borderColor: 'silver',
    borderBottomLeftRadius: 8,
    paddingLeft: 10,
  },
  postVedio: {
    width: '50%',
    height: '100%',
    backgroundColor: '#DEDCDC',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomRightRadius: 8,
    paddingLeft: 10,
  },
  textAdd: {
    color: '#B9B9B9',
    fontSize: 10,
    fontWeight: 'bold',
    paddingLeft: 20,
  },
  vedioImg: {
    width: 160,
    height: 100,
  },
  contentStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
