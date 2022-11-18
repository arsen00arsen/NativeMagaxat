import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import {TouchableOpacity} from 'react-native';
import {Share} from 'react-native';
const ShareButton = props => {
  return (
    <TouchableOpacity
      onPress={() =>
        Share.share(
          {
            message: 'https://sponsor.am/en',
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
      <Icon name={'share-alternative'} size={props.size} color={'#8A8A8A'} />
    </TouchableOpacity>
  );
};

export default ShareButton;
