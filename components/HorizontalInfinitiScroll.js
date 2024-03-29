import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import VideoComponent from './../components/VideoComponent';
import ImgComponentpost from './ImgComponentpost';

const HorizontalInfinitiScroll = props => {
  const {t} = useTranslation();
  const {isLoading, posts, loadMoreItem, from} = props;
  const {user} = useSelector(state => state.user);
  const [playIndex, setPlayIndex] = useState(0);

  const viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 40,
    waitForInteraction: true,
  };

  const onViewableItemsChanged = React.useCallback(({viewableItems}) => {
    setPlayIndex(viewableItems[0]?.index);
  });

  const viewabilityConfigCallbackPairs = React.useRef([
    {viewabilityConfig, onViewableItemsChanged},
  ]);

  const renderItem = ({item, index}) => {
    let content;
    if (item?.image) {
      content = (
        <ImgComponentpost
          uri={item}
          key={item.id}
          isMyne={user?.email === item?.user?.email ? true : false}
        />
      );
    } else {
      content = (
        <VideoComponent
          uri={item}
          key={item.id}
          isMyne={user?.email === item?.user?.email ? true : false}
          poused={playIndex === index ? false : true}
        />
      );
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
    <View style={styles.mainContainer}>
      {from === 'Account' ? null : (
        <View style={styles.lastUsersContainer}>
          <View style={styles.lastUsersContainercontent}>
            <Text style={styles.lastUsersContainerText}>
              {t('popularPosts')}
            </Text>
          </View>
        </View>
      )}
      <FlatList
        style={{width: '100%'}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}
        data={posts}
        onEndReached={() => loadMoreItem()}
        keyExtractor={(items, index) => index.toString()}
        ListFooterComponent={renderLoader}
        onEndReachedThreshold={0.5}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        renderItem={renderItem}
      />
    </View>
  );
};

export default HorizontalInfinitiScroll;

const styles = StyleSheet.create({
  lastUsersContainer: {
    display: 'flex',
    minWidth: '100%',
    height: 57,
    //borderRadius: 8,
    position: 'relative',
    justifyContent: 'center',
    marginTop: 5,
    backgroundColor: '#fff',
  },

  lastUsersContainerText: {
    color: '#606163',
    marginLeft: 15,
    fontSize: 15,
    fontWeight: '800',
  },
  lastUsersContainercontent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
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
