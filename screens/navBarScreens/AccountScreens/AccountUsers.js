import React, {memo, useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {loadUsers} from '../../../stores/lastUsers/userAction';

const AccountUsers = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const accounts = useSelector(state => state.users);
  const isFocused = useIsFocused();
  const [currentPage, setCurrentPage] = useState(1);
  const userProfilePage = elem => {
    navigation.navigate('AccountScreen', {
      user: elem,
    });
  };
  useEffect(() => {
    if (isFocused) {
      dispatch(loadUsers(1));
    }
  }, [isFocused]);

  const loadMoreItem = () => {
    setCurrentPage(currentPage + 1);
    dispatch(loadUsers(currentPage + 1));
  };

  const renderItem = ({item, index}) => {
    return (
      <View key={item.id} style={styles.users}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => userProfilePage(item)}>
          <View style={[styles.userProfile, styles.shadowProp]}>
            <View style={styles.imgFrame}>
              <Image source={{uri: item.image}} style={styles.userImage} />
            </View>
            <View>
              <Text style={styles.userName}>{item.lastname}</Text>
              <Text style={styles.userName}>{item.name}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <FlatList
      contentContainerStyle={{flexGrow: 1}}
      style={{width: '100%'}}
      showsVerticalScrollIndicator={false}
      onEndReached={loadMoreItem}
      data={accounts?.lastUsers}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      onEndReachedThreshold={0.5}
    />
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
  textEmpoty: {
    color: '#727272',
  },
});
