import React, {memo} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const AccountUsers = () => {
  const navigation = useNavigation();
  const accounts = useSelector(state => state.users);

  const userProfilePage = elem => {
    console.log(elem);
    navigation.navigate('AccountScreen', {
      user: elem,
    });
  };
  let content = accounts?.lastUsers?.map(elem => {
    return (
      <View key={elem.id} style={styles.users}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => userProfilePage(elem)}>
          <View style={[styles.userProfile, styles.shadowProp]}>
            <View style={styles.imgFrame}>
              <Image source={{uri: elem.image}} style={styles.userImage} />
            </View>
            <Text style={styles.userName}>
              {elem.lastname} {elem.name}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  });

  return (
    <ScrollView style={{width: '100%'}} showsVerticalScrollIndicator={false}>
      <View style={styles.wrapStyle}>
        {accounts?.lastUsers?.length < 1 ? (
          <View style={styles.usersEmpoty}>
            <Text style={styles.textEmpoty}>You havn`t any Users yet</Text>
          </View>
        ) : (
          content
        )}
      </View>
    </ScrollView>
  );
};

export default memo(AccountUsers);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
    paddingTop: 15,
    backgroundColor: '#F2F2F2',
    height: '100%',
  },
  users: {
    width: '100%',
    marginBottom: 10,
  },
  userProfile: {
    width: '100%',
    height: 75,
    display: 'flex',
    borderRadius: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  imgFrame: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#E6E6E6',
    width: 50,
    height: 50,
    marginHorizontal: 20,
  },
  shadowProp: {
    elevation: 7,
    shadowColor: '#785425',
    borderRadius: 8,
  },
  userImage: {
    width: 43,
    height: 43,
    borderRadius: 50,
  },
  userName: {
    fontSize: 16,
    color: '#727272',
    textAlign: 'left',
    fontWeight: '400',
  },
  wrapStyle: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
