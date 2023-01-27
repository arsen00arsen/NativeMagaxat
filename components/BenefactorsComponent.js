import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';

const BenefactorsComponent = ({navigation, loadMoreItem}) => {
  const {t} = useTranslation();
  const {isLoading, appears} = useSelector(state => state.appears);
  const renderLoader = () => {
    return isLoading ? (
      <View style={styles.loaderStyle}>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    ) : null;
  };
  let userProfilePage = item => {
    navigation.navigate('BenefactorUserPageScreen', {
      id: item.id,
    });
  };
  const renderItem = ({item, index}) => {
    return (
      <View key={index} style={{paddingHorizontal: 5}}>
        <View style={[styles.button, styles.shadowProp]}>
          <View style={styles.imgFrame}>
            <Image source={{uri: item.image}} style={styles.userImage} />
          </View>
          <View style={styles.descriptionContent}>
            <Text style={styles.title} numberOfLines={2}>
              {item.description}
            </Text>
            <TouchableOpacity
              onPress={() => userProfilePage(item)}
              style={styles.view}>
              <Text style={styles.viewText}>{t('view')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  return (
    <>
      {appears?.length < 1 ? (
        <View style={styles.usersEmpoty}>
          <Text style={styles.textEmpoty}>{t('youHavntUsers')}</Text>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={{flexGrow: 1, }}
          style={{width: '100%'}}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMoreItem}
          data={appears}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListFooterComponent={renderLoader}
          onEndReachedThreshold={0.5}
        />
      )}
    </>
  );
};

export default BenefactorsComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 15,
    backgroundColor: '#FFF',
    height: '100%',
  },
  users: {
    width: '100%',
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
  title: {
    width: '90%',
    fontWeight: 'bold',
    color: '#AF9065',
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#F2F2F2',
    borderRadius: 30,
    backgroundColor: '#F2F2F2',
  },
  descriptionContent: {
    width: '60%',
  },
  view: {
    width: '90%',
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#AF9065',
    borderRadius: 30,
    marginVertical: 5,
  },
  viewText: {
    color: '#FFF',
    fontSize: 20,
  },
  usersEmpoty: {
    flex: 1,
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
  },
});
