import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {loadUsers} from '../../stores/lastUsers/userAction';
import socketio from 'socket.io-client';
import Echo from 'laravel-echo';
import {createSocketConnection} from '../../http/socketService/socketService';
// import PushNotification from 'react-native-push-notification';

const MesageScreen = () => {
  const [data, setData] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const lastusers = useSelector(state => state);
  useEffect(() => {
    dispatch(loadUsers());
  }, []);
  const ENDPOINT = 'ws://192.168.0.112:6001';
  const [response, setResponse] = useState('');
  useEffect(() => {
    createSocketConnection();
  });
  // console.log(window.echo);
  // const getUsers = async () => {
  //   const querySanp = await firestore()
  //     .collection('users')
  //     .where('uid', '!=', user.uid)
  //     .get();
  //   const allusers = querySanp.docs.map(docSnap => docSnap.data());
  //   setUsers(allusers);
  // };

  // useEffect(() => {
  //   getUsers();
  // }, []);
  // const handleNotification = item => {
  //   PushNotification.localNotification({
  //     channelId: 'test-channel',
  //     title: item.usserName,
  //     message: item.messageText,
  //   });
  // };
  // const RenderCard = ({item, index}) => {
  //   return (
  //     <TouchableOpacity
  //       key={index}
  //       onPress={() =>
  //         navigation.navigate('Chat', {
  //           name: item.name,
  //           uid: item.uid,
  //           // status:
  //           //   typeof item.status === 'string'
  //           //     ? item.status
  //           //     : item.status.toDate().toString(),
  //         })
  //       }>
  //       <View style={styles.messageContainer}>
  //         <Image style={styles.userImg} source={{uri: item.image}} />
  //         <View>
  //           <Text style={styles.text}>{item.name}</Text>
  //           <Text style={styles.text}>{item.lastname}</Text>
  //         </View>
  //       </View>
  //     </TouchableOpacity>
  //   );
  // };

  return (
    <View style={styles.container}>
      {/* <View style={styles.messageBody}> */}
      {/* <FlatList
          data={lastusers.users.lastUsers}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return <RenderCard item={item} />;
          }}
        /> */}
      <Text style={styles.test}>{response} </Text>
      {/* </View> */}
    </View>
  );
};

export default MesageScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 15,
    position: 'relative',
  },
  // messageBody: {
  //   height: '90%',
  //   width: '100%',
  // },
  messageContainer: {
    flex: 1,
    width: '100%',
    // height: 100,
    backgroundColor: '#E6E6E6',
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    marginBottom: 10,
  },
  userImg: {
    width: 52,
    height: 52,
    borderRadius: 50,
  },
  userInfo: {
    width: '55%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  userName: {
    color: '#343333',
    fontSize: 14,
    fontWeight: 'bold',
  },
  userMessageView: {
    color: '#696969',
    fontSize: 12,
  },
  messageInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '20%',
  },
  messageTime: {
    color: '#343333',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  messageCountBody: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 17,
    height: 17,
    borderRadius: 50,
    backgroundColor: 'tomato',
  },
  messageCount: {
    fontSize: 13,
    color: '#FFFFFF',
  },
});

{
  /* <FlatList
          data={Message}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => handleNotification(item)}>
              <View style={styles.messageContainer}>
                <View>
                  <Image style={styles.userImg} source={item.usserImag} />
                </View>
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{item.usserName}</Text>
                  <Text style={styles.userMessageView} numberOfLines={2}>
                    {item.messageText}
                  </Text>
                </View>
                <View style={styles.messageInfo}>
                  <Text style={styles.messageTime}>{item.messageTime} </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        /> */
}
