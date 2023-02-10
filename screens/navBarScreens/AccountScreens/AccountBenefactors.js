import React, {memo, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {loadSponsors} from '../../../stores/appears/appearAction';
const AccountBenefactors = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const {sponsors} = useSelector(state => state.appears);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      dispatch(loadSponsors(1));
    }
  }, [isFocused]);

  const loadMoreItem = () => {
    setCurrentPage(currentPage + 1);
    dispatch(loadSponsors(currentPage + 1));
  };

  let userProfilePage = item => {
    navigation.navigate('AccountScreen', {
      user: item,
    });
  };

  const renderItem = ({item, index}) => {
    return (
      <View key={item.id} style={styles.users}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => userProfilePage(item)}>
          <LinearGradient
            style={styles.userProfile}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            locations={[0.0, 0.9]}
            colors={['#AFAFAF', '#E8E8E8']}>
            <View style={styles.imgFrame}>
              <Image source={{uri: item.image}} style={styles.userImage} />
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <Text style={styles.userName}>{item.name}</Text>
              <Text style={styles.userName}>{item.lastname}</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.scroll}>
      <View style={styles.flexWraps}>
        {sponsors.length < 1 ? (
          <View style={styles.usersEmpoty}>
            <Text style={styles.textEmpoty}>{t('youHavntUsers')}</Text>
          </View>
        ) : (
          <FlatList
            contentContainerStyle={{flexGrow: 1}}
            style={{width: '100%'}}
            showsVerticalScrollIndicator={false}
            onEndReached={loadMoreItem}
            data={sponsors}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            onEndReachedThreshold={0.5}
          />
        )}
      </View>
    </View>
  );
};

export default memo(AccountBenefactors);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 15,
    backgroundColor: '#F2F2F2',
    height: '100%',
  },
  scroll: {
    width: '100%',
  },
  users: {
    width: '46%',
  },
  userProfile: {
    width: 164,
    height: 200,
    display: 'flex',
    borderRadius: 8,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  imgFrame: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#E6E6E6',
    width: 89,
    height: 89,
  },
  userImage: {
    width: 83,
    height: 83,
    borderRadius: 50,
  },
  userName: {
    width: 100,
    fontSize: 18,
    color: '#727272',
    textAlign: 'center',
  },
  flexWraps: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  usersEmpoty: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textEmpoty: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 60,
    color: '#727272',
  },
});
