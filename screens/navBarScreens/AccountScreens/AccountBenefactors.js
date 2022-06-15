import React, {memo} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {useGetUsers} from '../../../components/hooks/useGetUsers';

const AccountBenefactors = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const {options} = useGetUsers();

  let userProfilePage = item => {
    navigation.navigate('AccountScreen', {
      user: item,
    });
  };

  let content = options.data?.map((elem, index) => {
    return (
      <View key={elem.id} style={styles.users}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => userProfilePage(elem)}>
          <LinearGradient
            style={styles.userProfile}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            locations={[0.0, 0.9]}
            colors={['#AFAFAF', '#E8E8E8']}>
            <View style={styles.imgFrame}>
              <Image source={{uri: elem.image}} style={styles.userImage} />
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <Text style={styles.userName}>{elem.name}</Text>
              <Text style={styles.userName}>{elem.last_name}</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  });

  return (
    <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
      <View style={styles.flexWraps}>
        {options.data?.length < 1 ? (
          <View style={styles.usersEmpoty}>
            <Text style={styles.textEmpoty}>
              You havn`t any Benefactors yet
            </Text>
          </View>
        ) : (
          content
        )}
      </View>
    </ScrollView>
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
  },
});
