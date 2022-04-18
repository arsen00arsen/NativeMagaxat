import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native';
import {Share} from 'react-native';
const ShareButton = () => {
  return (
    <TouchableOpacity
      onPress={() =>
        Share.share(
          {
            message:
              "BAM: we're helping your business with awesome React Native apps",
            url: 'http://bam.tech',
            title: 'Wow, did you see that?',
          },
          {
            // Android only:
            dialogTitle: 'Share BAM goodness',
            // iOS only:
            excludedActivityTypes: ['com.apple.UIKit.activity.PostToTwitter'],
          },
        )
      }>
      <Icon name={'share-outline'} size={24} color={'black'} />
    </TouchableOpacity>
  );
};

export default ShareButton;
