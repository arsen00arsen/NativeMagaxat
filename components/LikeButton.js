import React, {useState} from 'react';
import {Pressable, View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animated from 'react-native-animatable';
import {PostLike} from '../http/isLiked/isLiked';

const LikeButton = ({id, likeCounts, authLiked}) => {
  const [liked, setLiked] = useState(authLiked || false);
  const [count, setcount] = useState(likeCounts);

  const userLiked = async () => {
    try {
      setLiked(isLike => !isLike);
      await PostLike.isLiked(id);
      !liked ? setcount(count + 1) : setcount(count - 1);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <Pressable onPress={userLiked}>
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            {transform: [{scale: liked ? 0 : 1}]},
          ]}>
          <Icon name={'heart-outline'} size={24} color={'#8A8A8A'} />
        </Animated.View>

        <Animated.View style={[{transform: [{scale: liked ? 1 : 0}]}]}>
          <Icon name={'heart'} size={24} color={'red'} />
        </Animated.View>
      </Pressable>
      <Text>{count}</Text>
    </View>
  );
};

export default LikeButton;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
