import React, {useState} from 'react';
import {Pressable, View, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import * as Animated from 'react-native-animatable';
// import {PostLike} from '../http/isLiked/isLiked';

const LikeButton = ({id, likeCounts, authLiked}) => {
  const [liked, setLiked] = useState(authLiked || false);
  const [count, setcount] = useState(likeCounts - 1);

  const userLiked = async () => {
    // try {
    //   setLiked(isLike => !isLike);
    //   await PostLike.isLiked(id);
    //   !liked ? setcount(count + 1) : setcount(count - 1);
    // } catch (error) {
    //   console.log(error);
    // }
    console.log('2');
  };
  return (
    <View style={styles.container}>
      <Pressable onPress={userLiked}>
        <View
          style={[
            StyleSheet.absoluteFillObject,
            {transform: [{scale: liked ? 0 : 1}]},
          ]}>
          <Ionicons name="heart-outline" size={24} color={'#202020'} />
        </View>
        <View style={[{transform: [{scale: liked ? 1 : 0}]}]}>
          <Ionicons name="ios-heart-sharp" size={24} color={'red'} />
        </View>
      </Pressable>
      <Text style={styles.counts}>{count > 0 && count}</Text>
    </View>
  );
};

export default LikeButton;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  counts: {
    marginLeft: 5,
    fontWeight: '700',
    fontSize: 16,
    color: '#727272',
  },
});