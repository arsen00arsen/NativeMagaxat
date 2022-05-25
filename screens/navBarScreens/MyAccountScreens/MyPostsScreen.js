import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {baseUrl2} from '../../../http/index';
import {useTheme} from '@react-navigation/native';
import HeaderBackSearch from '../../../components/HeaderComponents/HeaderBackSearch';
import MyaccountUsserInfor from '../../../components/MyaccountUsserInfor';
import ImgComponentpost from '../../../components/ImgComponentpost';
import VideoComponent from '../../../components/VideoComponent';

const MyPostsScreen = ({navigation}) => {
  const theme = useTheme();
  const [dataPosts, setDataPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const getpost = async () => {
    setIsLoading(true);
    const urlPosts = baseUrl2 + `/posts_api?page=${currentPage}`;
    try {
      const response = await fetch(urlPosts, {
        headers: {
          Authorization:
            'Bearer ' + '10|oMlp7229KYP9nfdN2BrtCC2CjCuJIJF48fZsrV0J',
        },
      });
      const json = await response.json();
      setDataPosts([...dataPosts, ...json.data.data]);
    } catch (error) {
      console.log('error', error);
      setIsLoading(false);
    }
  };

  const renderItem = ({item}) => {
    let content;
    if (item.image_path) {
      content = <ImgComponentpost uri={item} key={item.id} />;
    } else {
      content = <VideoComponent uri={item} key={item.id} />;
    }
    return content;
  };

  const renderLoader = () => {
    return isLoading ? (
      <View style={styles.loaderStyle}>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    ) : null;
  };

  const loadMoreItem = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    getpost();
  }, [currentPage]);

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#009387"
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      <HeaderBackSearch />
      <ScrollView showsVerticalScrollIndicator={false} style={{width: '100%'}}>
        <MyaccountUsserInfor />
        <>
          <FlatList
            style={{width: '100%'}}
            showsVerticalScrollIndicator={false}
            data={dataPosts}
            onEndReached={info => loadMoreItem(info)}
            keyExtractor={(items, index) => index.toString()}
            ListFooterComponent={renderLoader}
            onEndReachedThreshold={0.5}
            renderItem={renderItem}
          />
        </>
      </ScrollView>
    </View>
  );
};

export default MyPostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
    paddingTop: 15,
    backgroundColor: '#F2F2F2',
    height: '100%',
  },
});
