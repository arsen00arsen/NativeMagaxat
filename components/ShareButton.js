import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native';
import {Share} from 'react-native';
const ShareButton = props => {
  return (
    <TouchableOpacity
      onPress={() =>
        Share.share(
          {
            //message: 'https://sponsor.am/en',
            url: 'https://sponsor.am/en',
            //title: 'Welcome to sponsor.am',
          },
          {
            // Android only:
            dialogTitle: 'Share your',
            // iOS only:
            excludedActivityTypes: ['com.apple.UIKit.activity.PostToTwitter'],
          },
        )
      }>
      <Ionicons
        name={'md-arrow-redo-circle'}
        size={props.size}
        color={'#c5c3c3'}
      />
      {/* <Icon name={'share-alternative'} size={props.size} color={'#8A8A8A'} /> */}
    </TouchableOpacity>
  );
};

export default ShareButton;
