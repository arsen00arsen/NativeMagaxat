import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from '../../../Elements/Icon';
import Button from '../../../Elements/Button';

function PatronsContent({user, t, myPosts}) {
  // const myUser = useSelector(state => state.user);
  const [longDes, setLongDes] = useState(false);
  const [isDescriptionTooLong, setIsDescriptionTooLong] = useState(false);
  const navigation = useNavigation();
  const isLongDs = () => {
    setLongDes(!longDes);
  };
  const handleTextLayout = e => {
    const {lines} = e.nativeEvent;
    if (lines.length > 4) {
      setIsDescriptionTooLong(true);
    }
  };
  let description;
  if (longDes === false) {
    description = (
      <Text
        style={[styles.usersTitle, {marginBottom: 5}]}
        numberOfLines={5}
        onTextLayout={handleTextLayout}>
        {user.description}
      </Text>
    );
  } else {
    description = (
      <Text style={[styles.longDis, {marginBottom: 5}]}>
        {user.description}
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.component}>
        <Image
          source={{uri: user.avatar}}
          style={{width: 78, height: 78, borderRadius: 45}}
        />
        <View style={{width: '70%', marginHorizontal: 15}}>
          <View style={styles.titleContent}>
            <Text style={styles.title} numberOfLines={2}>
              {user.title}
            </Text>
            {/* <Icon name="trophy" isPrimary size={36} /> */}
          </View>

          {myPosts ? null : (
            <Pressable
              style={styles.titleContent}
              onPress={() =>
                navigation.navigate('Home', {
                  screen: 'ChatContent',
                  params: {chatUser: user, getId: user.chat_id},
                })
              }>
              <Text style={styles.email}>{user.email}</Text>

              <Image source={require('../../../../assets/icons/Message.png')} />
            </Pressable>
          )}
        </View>
      </View>
      <View>
        <Text
          style={{
            color: '#000',
            fontSize: 16,
            fontWeight: '500',
            marginBottom: 10,
            marginTop: 10,
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
      <View style={{width: '60%', marginTop: 20}}>
        <Button
          isPrimary
          onPress={() =>
            navigation.navigate('PatronsSinglePage', {user: user})
          }>
          <Text style={{color: 'white', fontWeight: '600', fontSize: 18}}>
            {t('learn_more')}
          </Text>
        </Button>
      </View>
    </View>
  );
}
export default PatronsContent;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'column',
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: '#CFCCCC',
  },
  component: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: '#242424',
    fontSize: 32,
    fontWeight: '700',
  },
  email: {
    color: '#5F5F5F',
    fontSize: 16,
  },
  titleContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
