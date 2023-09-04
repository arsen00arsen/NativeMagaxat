import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View, StyleSheet, FlatList} from 'react-native';
import {useChannel, useEvent} from '@harelpls/use-pusher/react-native';
import {useIsFocused} from '@react-navigation/native';
import UserInfo from '../../../Components/UserInfo';
import UserService from '../../../http/Account/account';
// import {useDispatch} from 'react-redux';
// import {getNotifications} from '../../../../stores/notifications/notifActions';

const HomeScreen = () => {
  const [user, setUser] = useState([]);
  // const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const channel = useChannel(`private-app.user.notification.4`);
  useEvent(channel, 'new_notification', data => {
    console.log(data);
  });
  useEffect(() => {
    if (isFocused) {
      getUsers();
    }
  }, [isFocused]);

  const getUsers = async () => {
    setLoading(true);
    try {
      const {data} = await UserService.home(1);
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
      const {data} = await UserService.home({page: page});
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

  const renderItem = ({item}) => <UserInfo user={item} />;

  if (loading && page === 1) {
    return (
      <View style={styles.loadings}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <FlatList
      contentContainerStyle={{flexGrow: 1, paddingBottom: 150}}
      data={user}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
    />
  );
};
export default HomeScreen;
const styles = StyleSheet.create({
  loadings: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
