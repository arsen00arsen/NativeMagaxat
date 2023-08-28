import React, {useState, useEffect} from 'react';
import {Pressable, Text, StyleSheet, View, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import ProfileInfo from '../../../Components/Profile/ProfileInfo';
import {getMe, logoutUser} from '../../../../stores/user/userActions';
import DeleteAccountModal from '../../../Components/Profile/DeleteAccountModal';
import LogOutModal from '../../../Components/Profile/LogOutModal';

function MyProfileScreen({navigation}) {
  const isFocused = useIsFocused();
  const [modalVisible, setModalVisible] = useState(false);
  const [logOutModal, setLogOutModal] = useState(false);
  const {user} = useSelector(state => state.user);
  const buttons = [
    {id: 1, title: 'Language'},
    // {id: 2, title: 'Bio'},
    // {id: 3, title: , goto: 'MyPosts'},
    // {id: 6, title: 'Settings'},
    // {id: 7, title: 'Logout'},
  ];
  //   useEffect(() => {
  // console.log(1111)
  //   }, [isFocused]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <ProfileInfo user={user} />
        <View style={styles.component}>
          {buttons.map(elem => {
            return (
              <Pressable
                key={elem.id}
                style={styles.botton}
                onPress={() => navigation.navigate('Language')}>
                <Text style={styles.title}>{elem.title}</Text>
                <Ionicons
                  name="ios-chevron-forward-sharp"
                  color={'#B5B5BE'}
                  size={20}
                />
              </Pressable>
            );
          })}

          <Pressable
            style={styles.botton}
            onPress={() =>
              navigation.navigate('MyPosts', {posts: user?.patrons})
            }>
            <Text style={styles.title}>My Posts</Text>
            <Ionicons
              name="ios-chevron-forward-sharp"
              color={'#B5B5BE'}
              size={20}
            />
          </Pressable>
          <Pressable
            style={styles.botton}
            onPress={() => setModalVisible(true)}>
            <Text style={styles.title}>Delete Profile</Text>
            <Ionicons
              name="ios-chevron-forward-sharp"
              color={'#B5B5BE'}
              size={20}
            />
          </Pressable>
          <Pressable style={styles.botton} onPress={() => setLogOutModal(true)}>
            <Text style={styles.title}>Log Out</Text>
            <Feather name="log-out" color={'#B5B5BE'} size={20} />
          </Pressable>
        </View>
        <DeleteAccountModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
        <LogOutModal
          modalVisible={logOutModal}
          setModalVisible={setLogOutModal}
        />
      </View>
    </ScrollView>
  );
}
export default MyProfileScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  component: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    width: '100%',
    paddingHorizontal: 15,
    paddingTop: 30,
  },
  botton: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#C6C6C8',
  },
  title: {
    color: '#000000',
    fontSize: 16,
  },
});
