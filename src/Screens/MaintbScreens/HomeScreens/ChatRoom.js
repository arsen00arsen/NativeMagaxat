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
import GlobalStyles from '../../../Configs/GlobalStyles';
import PostService from '../../../http/Post/post';
import {useIsFocused} from '@react-navigation/native';

const ChatRoom = ({navigation}) => {
  const [user, setUser] = useState([]);
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (isFocused) {
      getUsers();
    }
  }, [isFocused]);

  const getUsers = async () => {
    setLoading(true);
    try {
      const {data} = await PostService.getAllMessages({page: 1});
      setUser(data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const onEndReached = async () => {
    setPage(page + 1);
    try {
      const {data} = await PostService.getAllMessages({page: page + 1});
      if (data.links.last_page > page) {
        const newData = data.data;
        user.push(...newData);
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({item}) => {
    return (
      <Pressable
        onPress={() => navigation.navigate('ChatContent', {chatUser: item})}
        style={styles.user}>
        <View style={{width: '70%', flexDirection: 'row'}}>
          <Image source={{uri: item.owner_image}} style={styles.userImage} />
          <View>
          <Text style={styles.usernames}>{item.owner}</Text>
          <Text style={styles.message}>{item.last_message}</Text>
          </View>
        </View>
        <Text style={{width: '25%', fontSize: 12}}>
          {item.last_message_created_at}
        </Text>
      </Pressable>
    );
  };

  if (loading && page === 1) {
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
      data={user}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
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
  },
});
