import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  Text,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useIsFocused} from '@react-navigation/native';
import SearchComponent from '../../../Elements/SearchComponent';
import PatronsContent from './PatronsContent';
import UserService from '../../../http/Account/account';

function PatronScreen() {
  const {t} = useTranslation();
  const [user, setUser] = useState([]);
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [categoryId, setCategoryId] = useState('');

  useEffect(() => {
    if (isFocused) {
      getCategories();
    }
  }, [isFocused, categoryId]);

  const getCategories = async () => {
    setLoading(true);
    try {
      const {data} = await UserService.filtre({
        page: 1,
        categoryId: categoryId,
      });
      setUser(data.data);
    } catch (err) {
      console.log(err.response);
    } finally {
      setLoading(false);
    }
  };

  const onEndReached = async () => {
    setPage(page + 1);
    try {
      const {data} = await UserService.filtre({
        page: page + 1,
        categoryId: categoryId,
      });
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
  const renderItem = ({item}) => <PatronsContent user={item} t={t} />;

  if (loading && page === 1) {
    return (
      <View style={styles.loadings}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <SafeAreaView>
      <SearchComponent
        searchTitle={t('searchPosts')}
        setCategoryId={setCategoryId}
        categoryId={categoryId}
        isCategory
      />
      {user.length === 0 && (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text>Chka</Text>
        </View>
      )}
      <FlatList
        contentContainerStyle={{flexGrow: 1, paddingBottom: 120}}
        data={user}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
}
export default PatronScreen;
const styles = StyleSheet.create({
  loadings: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
