import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {useSelector} from 'react-redux';

const MyaccountUsserInfor = () => {
  const user = useSelector(state => state?.user);

  return (
    <View style={styles.container}>
      <View style={styles.userProfile}>
        <View style={styles.imgFrame}>
          <Image source={{uri: user?.user?.image}} style={styles.userImage} />
        </View>
        <View style={styles.userInfo}>
          <View style={styles.names}>
            <Text style={styles.userName}>{user?.user?.name} </Text>
            <Text style={styles.userName}>{user?.user?.lastname} </Text>
          </View>
          <Text style={styles.userDate}>{user?.user?.date_of_birth}</Text>
        </View>
      </View>
    </View>
  );
};

export default MyaccountUsserInfor;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#f7f7f7',
  },
  userProfile: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  names: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  imgFrame: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#E6E6E6',
    width: 87,
    height: 87,
  },
  userImage: {
    width: 83,
    height: 83,
    borderRadius: 999,
    borderColor: '#E6E6E6',
    borderWidth: 3,
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginLeft: 20,
  },
  userName: {
    fontSize: 20,
    fontWeight: '400',
    color: '#727272',
  },
  lastname: {
    fontSize: 20,
    fontWeight: '400',
    color: '#727272',
    paddingLeft: 10,
  },
  userDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A4A4A',
  },
});
