import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DocumentPicker, {types} from 'react-native-document-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {loadStori, setSingleStori} from '../stores/stories/storiesAction';

const Stories = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {stori} = useSelector(state => state.stori);
  const {user} = useSelector(state => state.user);

  useEffect(() => {
    dispatch(loadStori());
  }, []);

  const postStory = async datas => {
    const fileToUpload = datas;
    const fdata = new FormData();
    fdata.append(datas?.type === 'image/png' ? 'image' : 'video', fileToUpload);
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch('https://magaxat.com/api/stories_api', {
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + token,
        },
        body: fdata,
      });
      const {data} = await res.json();
      dispatch(setSingleStori(data));
    } catch (error) {
      alert(error.message);
    }
  };

  const selectFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [types.video, types.images],
      });
      if (res[0].type === 'video/mp4' && res[0].size < 10485760) {
        postStory(res[0]);
      } else if (res[0].type === 'image/png' && res[0].size < 2097152) {
        postStory(res[0]);
      }
    } catch (err) {
      alert('Your story size to big');
    }
  };

  let content = stori.map((data, index) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() =>
          navigation.push('Status', {
            name: data.name,
            image: data.image,
            user: data.user,
            video: data.video,
            isMy: data.isMy,
            id: data.id,
          })
        }>
        <View style={styles.container}>
          <View style={styles.otherStory}>
            <Image source={{uri: data?.user.image}} style={styles.storiImage} />
          </View>
          <View
            style={{
              textAlign: 'center',
              fontSize: 11,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              // opacity: data.user.id == 0 ? 1 : 0.5,
            }}>
            <Text>{data?.user.name}</Text>
            <Text>{data?.user.lastname}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  });

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{paddingVertical: 20}}>
      <>
        <TouchableOpacity onPress={selectFile}>
          <View style={styles.container}>
            <View style={styles.myStori}>
              <Entypo name="circle-with-plus" style={styles.etno} />
            </View>

            <View style={styles.otherStory}>
              <Image source={{uri: user.image}} style={styles.storiImage} />
            </View>
          </View>
        </TouchableOpacity>
        {content}
      </>
    </ScrollView>
  );
};

export default Stories;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingHorizontal: 8,
    position: 'relative',
  },
  myStori: {
    position: 'absolute',
    bottom: 15,
    right: 10,
    zIndex: 1,
    paddingRight: 3,
  },
  etno: {
    fontSize: 20,
    color: '#405de6',
    backgroundColor: 'white',
    borderRadius: 100,
    marginVertical: 'auto',
  },
  otherStory: {
    width: 68,
    height: 68,
    backgroundColor: 'white',
    borderWidth: 1.8,
    borderRadius: 100,
    borderColor: '#AF9065',
    justifyContent: 'center',
    alignItems: 'center',
  },
  storiImage: {
    resizeMode: 'cover',
    width: '92%',
    height: '92%',
    borderRadius: 100,
    backgroundColor: 'orange',
  },
});
