import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  Pressable,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {useChannel, useEvent} from '@harelpls/use-pusher/react-native';
import PostService from '../../../http/Post/post';
import {useIsFocused} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const ChatRoom = ({navigation}) => {
  const {user} = useSelector(state => state.user);
  const [users, setUser] = useState([]);
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const channelName = `private-message.${user?.id}`;
  const channel = useChannel(channelName);
  const [updates, setUpdate] = useState(false);
  useEvent(channel, 'new_message', data => {
    console.log(data, 'ppppp');
    let updated = false; // Reset updated flag

    const updatedUsers = users.map(userObj => {
      if (
        userObj &&
        userObj.user_id === data.message.user_id &&
        userObj.owner_id === data.message.owner_id
      ) {
        // If they are the same, update the properties
        updated = true;

        return {
          ...userObj,
          last_message: data.message.last_message,
          last_message_updated_at: data.message.last_message_updated_at,
        };
      } else {
        return userObj;
      }
    });

    if (!updated) {
      setUpdate(true);
      console.log(222);
      // If no update was made, push the new object to the array
      updatedUsers.push(data);
    }

    setUser(updatedUsers);
  });

  useEffect(() => {
    if (isFocused) {
      console.log(111);
      getUsers();
    }
  }, [isFocused, updates]);

  const getUsers = async () => {
    setLoading(true);
    try {
      const {data} = await PostService.getAllMessages();
      setUser(
        data.data
          .sort(
            (a, b) =>
              a.last_message_updated_at_timstamp -
              b.last_message_updated_at_timstamp,
          )
          .reverse(),
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({item}) => {
    return (
      <Pressable
        onPress={() =>
          navigation.navigate('ChatContent', {
            chatUser: item?.user,
            owner_ids: item?.owner_id,
            getId: item?.id,
          })
        }
        style={styles.user}>
        <View style={{width: '70%', flexDirection: 'row'}}>
          <Image
            source={{
              uri:
                item?.owner_id === user?.id
                  ? item?.user?.image
                  : item?.owner?.image,
            }}
            style={styles.userImage}
          />
          <View>
            <Text style={styles.usernames}>
              {item?.owner_id === user?.id
                ? item?.user?.full_name
                : item?.owner?.full_name}
            </Text>
            <Text style={styles.message} numberOfLines={2}>
              {item?.last_message}
            </Text>
          </View>
        </View>
        <Text style={{width: '25%', fontSize: 12}}>
          {item?.last_message_updated_at}
        </Text>
      </Pressable>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadings}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <FlatList
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: 150,
        paddingHorizontal: 15,
      }}
      data={users}
      renderItem={renderItem}
      keyExtractor={item => item?.id?.toString()}
    />
  );
};
export default ChatRoom;
const styles = StyleSheet.create({
  loadings: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  user: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    width: '100%',
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 5,
  },
  usernames: {
    color: '#111315',
    fontWeight: '500',
    fontSize: 17,
  },
  message: {
    color: '#98A2B3',
    fontSize: 12,
    width: '50%',
  },
});
