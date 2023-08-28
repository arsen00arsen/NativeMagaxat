import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native';
import {Share} from 'react-native';
const ShareButton = ({size}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        Share.share(
          {
            url: 'https://sponsor.am/en',
          },
          {
            dialogTitle: 'Share your',
            excludedActivityTypes: ['com.apple.UIKit.activity.PostToTwitter'],
          },
        )
      }>
      <Ionicons name={'share-social'} size={size} color={'#202020'} />
    </TouchableOpacity>
  );
};

export default ShareButton;
