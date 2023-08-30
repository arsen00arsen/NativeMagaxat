import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  Text,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import SearchBar from 'react-native-dynamic-search-bar';
import {useTranslation} from 'react-i18next';
import PostService from '../../../http/Post/post';

const PatronsSearch = ({navigation}) => {
  const [user, setUser] = useState([]);
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [name, setName] = useState('');
  const {t} = useTranslation();
  useEffect(() => {
    if (isFocused) {
      getPosts();
    } else {
      setPage(1);
    }
  }, [isFocused, name]);

  const getPosts = async () => {
    setLoading(true);
    try {
      const {data} = await PostService.postSearch({name: name, page: 1});
      if (page === 1) {
        setUser(data.data);
      } else {
        setUser(prevUser => [...prevUser, ...data.data]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const onEndReached = () => {
    if (!loading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const renderItem = ({item}) => {
    return (
      <Pressable
        onPress={() => navigation.navigate('PatronsSinglePage', {user: item})}
        style={styles.mainContent}>
        <Image source={{uri: item.avatar}} style={styles.postImage} />
        <View style={{width: '80%'}}>
          <Text style={{fontSize: 16, fontWeight: '700'}}>{item.title}</Text>
          <Text style={{fontSize: 14}} numberOfLines={2}>
            {item.description}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={{flex: 1, padding: 15}}>
      <SearchBar
        fontSize={14}
        fontColor="#BB9E79"
        iconColor="#BB9E79"
        shadowColor="#282828"
        cancelIconColor="#BB9E79"
        placeholder={t('post_search_title')}
        onChangeText={text => {
          setName(text);
          setPage(1); // Reset page when search text changes
        }}
        onPress={() => setLoading(true)}
        style={styles.searchbody}
        underlineColorAndroid="white"
      />
      {loading && page === 1 ? (
        <View style={styles.loadings}>
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          contentContainerStyle={{flexGrow: 1, paddingBottom: 120}}
          data={user}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading && <ActivityIndicator />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loadings: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchbody: {
    width: '100%',
    height: 47,
    backgroundColor: 'white',
    marginTop: 10,
    marginHorizontal: 15,
  },
  mainContent: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 10,
  },
  postImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
});

export default PatronsSearch;
