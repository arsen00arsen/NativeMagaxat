import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import {TouchableOpacity} from 'react-native';
import {Share} from 'react-native';
const ShareButton = () => {
  return (
    <TouchableOpacity
      onPress={() =>
        Share.share(
          {
            message: 'https://sponsor.am',
            url: 'https://sponsor.am',
            title: 'Welcome to sponsor.am',
          },
          {
            // Android only:
            dialogTitle: 'Share your',
            // iOS only:
            excludedActivityTypes: ['com.apple.UIKit.activity.PostToTwitter'],
          },
        )
      }>
      <Icon name={'share-alternative'} size={24} color={'#8A8A8A'} />
    </TouchableOpacity>
  );
};

export default ShareButton;
