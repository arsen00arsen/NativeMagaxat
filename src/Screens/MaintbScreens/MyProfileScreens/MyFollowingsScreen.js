import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  FlatList,
  Image,
  Text,
  Pressable,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import UserService from '../../../http/Account/account';

const MyFollowingsScreen = ({navigation}) => {
  const [user, setUser] = useState([]);
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (isFocused) {
      getUsers();
    }
  }, []);

  const getUsers = async () => {
    setLoading(true);
    try {
      const {data} = await UserService.getFollowings(1);
      setUser(data.data);
    } catch (err) {
      console.log(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };
console.log(user, 'pppp')
  const onEndReached = async () => {
    setPage(page + 1);
    try {
      const {data} = await UserService.getFollowings({page: page});
      if (data.links.last_page > page) {
        setUser([...data, ...this.state.data]);
      } else {
        return;
      }
    } catch (error) {
      console.log(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({item}) => {
    return (
      <Pressable
        style={styles.userComponent}
        onPress={() =>
          navigation.navigate('Profiles', {
            screen: 'FreandsSingleScreen',
            params: {id: item.id},
          })
        }>
        <Image
          source={{uri: item?.avatar}}
          style={{width: 78, height: 78, borderRadius: 45, marginRight: 15}}
        />
        <View>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.email}>{item.email}</Text>
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
      contentContainerStyle={{flexGrow: 1, paddingBottom: 150}}
      data={user}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
    />
  );
};
export default MyFollowingsScreen;
const styles = StyleSheet.create({
  loadings: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userComponent: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
  name: {
    color: '#242424',
    fontSize: 32,
  },
  email: {
    color: '#5F5F5F',
    fontSize: 16,
  },
});
