import React, {useState} from 'react';
import {Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animated from 'react-native-animatable';
import {StyleSheet} from 'react-native';

const LikeButton = () => {
  const [liked, setLiked] = useState(false);

  return (
    <Pressable onPress={() => setLiked(isLiked => !isLiked)}>
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
  );
};

export default LikeButton;
