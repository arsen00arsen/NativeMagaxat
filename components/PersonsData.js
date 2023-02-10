import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {loadUsers} from '../stores/lastUsers/userAction';
const userWidth = Dimensions.get('window').width;

const PersonsData = () => {
  const dispatch = useDispatch();
  const {isLoading, lastUsers} = useSelector(state => state.users);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  useEffect(() => {
    dispatch(loadUsers(1));
  }, []);

  const ItemRender = item => {
    let img;
    if (item.userImage !== undefined) {
      img = {uri: item.userImage};
    } else {
      img = require('./../assets/defoult.png');
    }
    let imgBG;
    if (isLoading === true) {
      return (imgBG = (
        <View style={styles.loaderStyle}>
          <ActivityIndicator size="large" color="#E4E3E1" />
        </View>
      ));
    } else {
      imgBG = (
        <ImageBackground
          source={img}
          resizeMode="cover"
          style={styles.usersProfileBGimage}
          imageStyle={styles.imageStyle}
        />
      );
    }
    return (
      <View style={styles.usersProfile}>
        {imgBG}
        <View style={styles.info}>
          <Text style={styles.itemText} numberOfLines={2}>
            {item.name}
          </Text>
        </View>
      </View>
    );
  };
  const Separator = () => {
    return <View style={styles.seperator} />;
  };
  let userProfilePage = item => {
    navigation.navigate('AccounProfiletScreen', {
      id: item.id,
    });
  };
  const renderLoader = () => {
    return isLoading ? (
      <View style={styles.loaderStyle}>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    ) : null;
  };

  return (
    <>
      <FlatList
        style={styles.lastUsersContainer}
        data={lastUsers}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => userProfilePage(item)}>
            <ItemRender name={item.name} userImage={item.image} />
          </TouchableOpacity>
        )}
        ListFooterComponent={renderLoader}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={Separator}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
};

export default PersonsData;

const styles = StyleSheet.create({
  lastUsersContainer: {
    paddingHorizontal: 5,
  },
  usersProfile: {
    width: (userWidth - 25) / 4,
    height: 120,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 4,
    marginTop: 5,
    overflow: 'hidden',
  },
  itemText: {
    fontSize: 12,
    fontWeight: '500',
    paddingHorizontal: 7,
    color: '#606163',
  },
  usersProfileBGimage: {
    flex: 1,
    width: '100%',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  info: {
    height: 30,
    backgroundColor: '#fff',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
  seperator: {
    width: 5,
    height: 50,
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
});
