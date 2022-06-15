import React, {useEffect} from 'react';
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
import {loadChatUser} from '../../stores/chatUsers/chatUsersActions';

const MesageScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const chatUsers = useSelector(state => state.chatUsers);
  const newMessage = useSelector(state => state?.messages.allNewMessages);

  useEffect(() => {
    dispatch(loadChatUser());
  }, []);

  const RenderCard = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() =>
          navigation.navigate('Chat', {
            name: item.name,
            uid: item.id,
            image: item.image,
            // status:
            //   typeof item.status === 'string'
            //     ? item.status
            //     : item.status.toDate().toString(),
          })
        }>
        <View style={styles.messageContainer}>
          <Image style={styles.userImg} source={{uri: item.image}} />
          <View style={styles.messageUserBody}>
            <View style={styles.userNames}>
              <Text style={styles.userName}>{item.name}</Text>
              <Text style={styles.nameSurname}>{item.lastname}</Text>
            </View>
            <View>
              {newMessage.map(last => {
                if (item.id === last.from) {
                  return (
                    <View key={last.id} tyle={styles.lastMessageContainer}>
                      <Text style={styles.lastText} numberOfLines={2}>
                        {last?.text}{' '}
                      </Text>
                      <View style={styles.newMessage}>
                        <Text style={styles.newMessageText}>Message</Text>
                      </View>
                    </View>
                  );
                } else {
                  return null;
                }
              })}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.messageBody}>
        {chatUsers?.chatUsers.length < 1 ? (
          <View style={styles.usersEmpoty}>
            <Text style={styles.textEmpoty}>
              You havn`t any Users for messageing
            </Text>
          </View>
        ) : (
          <FlatList
            data={chatUsers?.chatUsers}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              return <RenderCard item={item} />;
            }}
          />
        )}
      </View>
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
  messageContainer: {
    flex: 1,
    width: '100%',
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
  nameSurname: {
    color: '#343333',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 10,
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
  userNames: {
    display: 'flex',
    flexDirection: 'row',
  },
  messageUserBody: {
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
  },
  lastMessageContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  newMessage: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    width: '30%',
    textAlign: 'center',
    height: 25,
    borderRadius: 10,
    right: 0,
    top: -20,
    position: 'absolute',
  },
  lastText: {
    width: '60%',
  },
  newMessageText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
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
