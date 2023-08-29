import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  FlatList,
  Text,
  Image,
  Pressable,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import PostService from '../../../http/Post/post';

const NotificationsScreen = () => {
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
      const {data} = await PostService.getNotification(1);
      console.log(data.data);
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
      const {data} = await PostService.getNotification({page: page});
      if (data.links.last_page > page) {
        setUser([...data, ...this.state.data]);
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const isRead = async id => {
    try {
      const {data} = await PostService.readNotifications(id);
      const updatedArray = user.map(item => {
        if (item.id === id) {
          return {...item, created_at: '1'};
        }
        return item;
      });

      setUser(updatedArray);
      console.log(updatedArray);
    } catch (error) {
      console.log(error.response);
    } finally {
    }
  };
  const renderItem = ({item}) => {
    console.log(item);
    return (
      <Pressable
        style={[styles.contentTitle, {alignItems: 'flex-start'}]}
        onPress={() => isRead(item.id)}>
        <View>
          <Image
            source={require('../../../../assets/Logo.png')}
            style={styles.coverPhoto}
          />
          {item.read_at === null ? (
            <View style={styles.count}>
              <Text style={{color: 'white', fontSize: 14, fontWeight: '700'}}>
                1
              </Text>
            </View>
          ) : null}
        </View>
        <View style={{marginLeft: 5}}>
          <Text style={{fontSize: 18, fontWeight: '700'}}>Sponsor</Text>
          <Text style={{fontSize: 16, color: '#5E5E5E'}}>
            {item.created_at}
          </Text>
        </View>
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
export default NotificationsScreen;
const styles = StyleSheet.create({
  loadings: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 15,
  },
  coverPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  count: {
    backgroundColor: 'red',
    width: 23,
    height: 23,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    position: 'absolute',
    right: 0,
    bottom: 20,
  },
});
