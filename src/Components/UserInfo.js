import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
// import  from '../Elements/Text';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ShareButton from '../Elements/ShareButton';
import LikeButton from '../Elements/LikeButton';

const UserInfo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.userCard}>
        <View
          style={[
            styles.contentTitle,
            {paddingHorizontal: 20, marginBottom: 20},
          ]}>
          <View style={[styles.contentTitle, {alignItems: 'flex-start'}]}>
            <Image
              source={require('../../assets/fakeImages/png1.png')}
              style={styles.coverPhoto}
            />
            <View>
              <Text style={{fontSize: 18, fontWeight: 700}}> Ani Hakobyan</Text>
              <Text style={{fontSize: 16, color: '#5E5E5E'}}>2 days ago</Text>
            </View>
          </View>
          <View style={styles.contentTitle}>
            <MaterialCommunityIcons name="dots-horizontal" size={25} />
            <MaterialCommunityIcons
              name="close"
              size={25}
              style={{marginLeft: 10}}
            />
          </View>
        </View>
        <Image source={require('../../assets/fakeImages/png1.png')} />
        <View>
          <View
            style={[
              styles.contentTitle,
              {paddingHorizontal: 20, marginTop: 10},
            ]}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <LikeButton />
              <Text style={{fontSize: 18}}> 4 </Text>
              <FontAwesome
                name="comment-o"
                size={25}
                style={{marginLeft: 10}}
              />
              <Text style={{fontSize: 18}}> 24 </Text>
              <ShareButton size={25} />
            </View>
          </View>
          <Text style={{paddingHorizontal: 20, marginTop: 10}}>
            industry My idea aims to revolutionize [provide a brief description
            of the idea and its potential impact]. It has the potential to
            disrupt the industry and create positive change on a global scale.
            However, I cannot achieve this goal alone. I am seeking a sponsor
            who not only recognizes the potential of this idea but also has the
            means and expertise to provide the necessary support.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userCard: {
    paddingVertical: 20,
    backgroundColor: 'white',
  },
  contentTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  coverPhoto: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});
