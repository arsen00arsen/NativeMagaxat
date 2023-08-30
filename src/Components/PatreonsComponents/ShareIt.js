import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Share,
} from 'react-native';

function ShareIt({post}) {
  const {t} = useTranslation();
  const [longDes, setLongDes] = useState(false);
  const [isDescriptionTooLong, setIsDescriptionTooLong] = useState(false);
  const handleTextLayout = e => {
    const {lines} = e.nativeEvent;
    if (lines.length > 4) {
      setIsDescriptionTooLong(true);
    }
  };
  const isLongDs = () => {
    setLongDes(!longDes);
  };
  let description;
  if (longDes === false) {
    description = (
      <Text
        style={[styles.usersTitle, {marginBottom: 5}]}
        numberOfLines={5}
        onTextLayout={handleTextLayout}>
        {post}
      </Text>
    );
  } else {
    description = (
      <Text style={[styles.longDis, {marginBottom: 5}]}>{post}</Text>
    );
  }
  return (
    <View style={styles.container}>
      <View>
        <Text
          style={{
            color: '#000',
            fontSize: 16,
            fontWeight: '500',
            marginBottom: 10,
          }}>
          {t('description')}
        </Text>
        {description}
        {isDescriptionTooLong && (
          <TouchableOpacity onPress={isLongDs}>
            <Text style={{color: 'red', textAlign: 'right'}}>
              {!longDes ? t('read_more') : t('read_less')}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.shareContent}>
        <Text
          style={{
            color: '#000',
            fontSize: 24,
            fontWeight: '700',
            marginBottom: 50,
          }}>
          {t('share')}
        </Text>
        <TouchableOpacity
          delayPressIn={0}
          onPress={() =>
            Share.share(
              {
                url: 'https://sponsor.am/en',
              },
              {
                dialogTitle: 'Share your',
                excludedActivityTypes: [
                  'com.apple.UIKit.activity.PostToTwitter',
                ],
              },
            )
          }>
          <Image
            source={require('../../../assets/ShareIt.png')}
            style={{width: 300, height: 150}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default ShareIt;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 15,
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: '#CFCCCC',
  },
  shareContent: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 150,
    marginTop: 50,
  },
});
