import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import VideoComponent from './../components/VideoComponent';
import ImgComponentpost from './ImgComponentpost';

const HorizontalInfinitiScroll = props => {
  const {isLoading, posts, loadMoreItem} = props;
  const renderItem = ({item}) => {
    let content;
    if (item?.image) {
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

  return (
    <>
      <LinearGradient
        style={styles.lastUsersContainer}
        start={{x: 1, y: 0}}
        end={{x: 1, y: 1}}
        locations={[0.3, 0.8]}
        colors={['#E0D0BA', '#E4E3E1']}>
        <View style={styles.lastUsersContainercontent}>
          <View style={styles.lastUsersContainerSmall} />
          <Text style={styles.lastUsersContainerText}>Popular Posts</Text>
        </View>
      </LinearGradient>
      <FlatList
        style={{width: '100%'}}
        showsVerticalScrollIndicator={false}
        data={posts}
        onEndReached={() => loadMoreItem()}
        keyExtractor={(items, index) => index.toString()}
        ListFooterComponent={renderLoader}
        onEndReachedThreshold={0.5}
        renderItem={renderItem}
      />
    </>
  );
};

export default HorizontalInfinitiScroll;

const styles = StyleSheet.create({
  lastUsersContainer: {
    display: 'flex',
    minWidth: '100%',
    height: 57,
    borderRadius: 8,
    position: 'relative',
    justifyContent: 'center',
    marginTop: 20,
  },
  lastUsersContainerSmall: {
    height: 30,
    width: 8,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: '#ACA093',
    marginRight: 10,
  },
  lastUsersContainerText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#838383',
    fontFamily: 'Roboto-Bold',
  },
  lastUsersContainercontent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    height: 30,
    backgroundColor: '#DEDEDE',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
});
