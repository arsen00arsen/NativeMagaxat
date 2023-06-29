import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from '../../Elements/Icon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../../Elements/Button';

function FreandsContent({}) {
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.container}>
        <View style={styles.component}>
          <Image
            source={require('../../../assets/fakeImages/png1.png')}
            style={{width: 78, height: 78, borderRadius: 45}}
          />
          <View style={{width: '70%', marginHorizontal: 10}}>
            <TouchableOpacity
              style={styles.titleContent}
              onPress={() => navigation.navigate('FreandsSingleScreen')}>
              <Text style={styles.title}>Ara Grigoryan</Text>
              <Ionicons name="md-star" color={'#4F48EC'} size={30} />
            </TouchableOpacity>
            <View style={styles.titleContent}>
              <Text style={styles.email}>infosportmasters@gmail.com</Text>
            </View>
            <View style={styles.titleContent}>
              <Text style={[styles.email, {fontSize: 15, color: '#333'}]}>
                Followers(1456), Followings(1490)
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Button isPrimary onPress={() => console.log('PatronsSinglePage')}>
            <Text
              style={{
                color: 'white',
                fontWeight: 600,
                fontSize: 18,
                paddingHorizontal: 40,
              }}>
              Follow
            </Text>
          </Button>
          <Button
            isTransparent
            onPress={() => console.log('PatronsSinglePage')}>
            <Text
              style={{
                color: '#4F48EC',
                fontWeight: 600,
                fontSize: 18,
                paddingHorizontal: 40,
              }}>
              Message
            </Text>
          </Button>
        </View>
      </View>
      <View style={styles.orangeLine}>
        <Text style={{color: '#FFFFFF', fontSize: 16, paddingHorizontal: 15}}>
          Sport
        </Text>
        <Text style={{color: '#FFFFFF', fontSize: 16, paddingHorizontal: 15}}>
          Sport
        </Text>
        <Text style={{color: '#FFFFFF', fontSize: 16, paddingHorizontal: 15}}>
          Sport
        </Text>
        <Text style={{color: '#FFFFFF', fontSize: 16, paddingHorizontal: 15}}>
          Sport
        </Text>
      </View>
    </>
  );
}
export default FreandsContent;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'column',
    padding: 15,
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: '#CFCCCC',
  },
  component: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: '#242424',
    fontSize: 32,
  },
  email: {
    color: '#5F5F5F',
    fontSize: 16,
  },
  titleContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 8,
  },
  orangeLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ED7B12',
    height: 50,
    alignItems: 'center',
    width: '100%',
    marginBottom: 30,
  },
});
