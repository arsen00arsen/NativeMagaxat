import React, {useState, useEffect} from 'react';
import {FlatList, View, ActivityIndicator, StyleSheet} from 'react-native';
import { useTranslation } from 'react-i18next';
import SearchComponent from '../../../Elements/SearchComponent';
import FreandsContent from '../../../Components/FreandsComponent/FreandsContent';
import UserService from '../../../http/Account/account';

function FreandScreen() {
  const {t} = useTranslation();
  const [user, setUser] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [categoryAge, setCategoryAge] = useState('');
  const [categoryCountry, setCategorycategoryCountry] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getCategories();
  }, [categoryCountry, categoryAge, categoryId]);
  const getCategories = async () => {
    setLoading(true);
    try {
      const {data} = await UserService.getFreands({
        page: 1,
        categoryId: categoryId !== '' ? categoryId : '',
        start: categoryAge !== '' ? categoryAge.start : '',
        end: categoryAge !== '' ? categoryAge.end : '',
        countryId: categoryCountry !== '' ? categoryCountry : '',
      });
      setUser(data.data);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const onEndReached = async () => {
    setPage(page + 1);
    try {
      const {data} = await UserService.getFreands({
        page: page,
        categoryId: categoryId !== '' ? categoryId : '',
        start: categoryAge !== '' ? categoryAge.start : '',
        end: categoryAge !== '' ? categoryAge.end : '',
        countryId: categoryCountry !== '' ? categoryCountry : '',
      });
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

  const renderItem = ({item}) => <FreandsContent user={item} />;

  if (loading && page === 1) {
    return (
      <View style={styles.loadings}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <View
      style={{
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
      }}>
      <SearchComponent
        searchTitle={t('searchUsers')}
        isFreandsScreen
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        categoryAge={categoryAge}
        setCategoryAge={setCategoryAge}
        setCategorycategoryCountry={setCategorycategoryCountry}
        categoryCountry={categoryCountry}
      />
      <FlatList
        contentContainerStyle={{flexGrow: 1, paddingBottom: 180}}
        data={user}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}
export default FreandScreen;
const styles = StyleSheet.create({
  loadings: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
