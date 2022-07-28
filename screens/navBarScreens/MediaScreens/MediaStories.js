import React, {useEffect, useState} from 'react';
import {View, FlatList, Dimensions, RefreshControl} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import Post from '../../../components/Post';
import {loadStori} from '../../../stores/stories/storiesAction';

export default function MediaStories() {
  const isFocused = useIsFocused();
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const {stori} = useSelector(state => state.stori);
  const [refreshing, setRefreshing] = useState(false);

  const loadMoreItem = () => {
    setCurrentPage(currentPage + 1);
    dispatch(loadStori(currentPage + 1));
  };

  useEffect(() => {
    if (isFocused) {
      dispatch(loadStori(1));
    }
  }, [isFocused, refreshing]);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1500).then(() => setRefreshing(false));
  }, []);

  return (
    <View>
      <FlatList
        data={stori}
        renderItem={({item}) => <Post post={item} />}
        showsVerticalScrollIndicator={false}
        snapToInterval={Dimensions.get('window').height - 78}
        snapToAlignment={'start'}
        windowSize={4}
        initialNumToRender={2}
        maxToRenderPerBatch={2}
        keyExtractor={item => item.id}
        decelerationRate={'normal'}
        onEndReached={() => loadMoreItem()}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#E4E3E1']}
          />
        }
      />
    </View>
  );
}
