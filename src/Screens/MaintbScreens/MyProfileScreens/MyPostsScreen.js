import React from 'react';
import {StyleSheet, FlatList, SafeAreaView} from 'react-native';
import {useTranslation} from 'react-i18next';
import PatronsContent from '../PatronsScreen/PatronsContent';

function MyPostsScreen({route}) {
  const {t} = useTranslation();
  const {posts} = route?.params;

  const renderItem = ({item}) => <PatronsContent user={item} t={t} myPosts />;

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
