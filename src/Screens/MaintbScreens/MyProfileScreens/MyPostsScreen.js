import React from 'react';
import {StyleSheet, FlatList, SafeAreaView} from 'react-native';
import PatronsContent from '../PatronsScreen/PatronsContent';

function MyPostsScreen({route}) {
  //   const [user, setUser] = useState([]);
  const posts = route?.params?.posts;

  //   useEffect(() => {
  //     if (isFocused) {
  //       getCategories();
  //     }
  //   }, [isFocused]);

  //   const getCategories = async () => {
  //     setLoading(true);
  //     try {
  //       const {data} = await UserService.filtre({
  //         page: 1,
  //         categoryId: categoryId,
  //       });
  //       setUser(data.data);
  //     } catch (err) {
  //       console.log(err.response);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   const onEndReached = async () => {
  //     setPage(page + 1);
  //     try {
  //       const {data} = await UserService.filtre({page: page + 1});
  //       if (data.links.last_page > page) {
  //         setUser([...data, ...this.state.data]);
  //       } else {
  //         return;
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  const renderItem = ({item}) => <PatronsContent user={item} />;

  //   if (loading && page === 1) {
  //     return (
  //       <View style={styles.loadings}>
  //         <ActivityIndicator />
  //       </View>
  //     );
  //   }
  return (
    <SafeAreaView>
      <FlatList
        contentContainerStyle={{flexGrow: 1, paddingBottom: 120}}
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        // onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
}
export default MyPostsScreen;
const styles = StyleSheet.create({
  loadings: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
