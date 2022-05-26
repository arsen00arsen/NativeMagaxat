import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
// import ImageView from 'react-native-image-viewing';
import {loadUsers} from '../stores/lastUsers/userAction';

const PersonsData = () => {
  const dispatch = useDispatch();
  const {isLoading, lastUsers} = useSelector(state => state.users);
  const navigation = useNavigation();
  useEffect(() => {
    dispatch(loadUsers());
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
          <Image style={styles.img} source={img} />
          <Text style={styles.itemText} numberOfLines={1}>
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
    dispatch({type: 'USSER_ID', payload: item.id});
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
      <LinearGradient
        style={styles.lastUsersContainer}
        start={{x: 1, y: 0}}
        end={{x: 1, y: 1}}
        locations={[0.3, 0.8]}
        colors={['#E0D0BA', '#E4E3E1']}>
        <View style={styles.lastUsersContainercontent}>
          <View style={styles.lastUsersContainerSmall} />
          <Text style={styles.lastUsersContainerText}>Last Signed Users</Text>
        </View>
      </LinearGradient>
      <FlatList
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
    display: 'flex',
    minWidth: '100%',
    height: 57,
    borderRadius: 8,
    position: 'relative',
    justifyContent: 'center',
    marginTop: 20,
  },
  lastUsersContainerSmall: {
    height: 30,
    width: 8,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: '#ACA093',
    marginRight: 10,
  },
  lastUsersContainerText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#838383',
    fontFamily: 'Roboto-Bold',
  },
  lastUsersContainercontent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  usersProfile: {
    width: 72,
    height: 150,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 15,
  },
  itemText: {
    fontSize: 8,
    width: 48,
    color: '#464646',
  },
  img: {
    height: 15,
    width: 15,
    borderRadius: 50,
    marginHorizontal: 5,
  },
  usersProfileBGimage: {
    flex: 1,
    width: '100%',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  info: {
    height: 30,
    backgroundColor: '#DEDEDE',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
  seperator: {
    width: 10,
    height: 50,
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: 'center',
  },
  imageStyle: {
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
});
