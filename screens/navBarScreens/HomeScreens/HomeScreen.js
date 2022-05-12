// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   StatusBar,
//   SafeAreaView,
//   FlatList,
//   ScrollView,
//   TouchableOpacity,
//   ActivityIndicator,
//   ImageBackground,
// } from 'react-native';
// import {useTheme} from '@react-navigation/native';
// import LinearGradient from 'react-native-linear-gradient';
// import HeaderChatSearch from '../../../components/HeaderComponents/HeaderChatSearch';
// import {baseUrl2} from '../../../http/index';
// import {useDispatch} from 'react-redux';
// import PostsComponent from '../../../components/PostsComponent';
// import PushNotification from 'react-native-push-notification';
// import VideoComponent from '../../../components/VideoComponent';

// const HomeScreen = ({navigation}) => {
//   const [data, setData] = useState('');
//   const theme = useTheme();
//   const dispatch = useDispatch();
//   const [dataPosts, setDataPosts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     createChanels();
//     fetchData();
//   }, []);

//   const url = baseUrl2 + '/users/list';
//   const fetchData = async () => {
//     try {
//       const response = await fetch(url);
//       const json = await response.json();
//       setData(json);
//     } catch (error) {
//       console.log('error', error);
//     }
//   };

//   const createChanels = () => {
//     PushNotification.createChannel({
//       channelId: 'test-channel',
//       channelName: 'Test Channel',
//     });
//   };

//   const ItemRender = item => {
//     let img;
//     if (item.userImage !== undefined) {
//       img = {uri: item.userImage};
//     } else {
//       img = require('../../../assets/defoult.png');
//     }
//     return (
//       <View style={styles.usersProfile}>
//         <ImageBackground
//           source={img}
//           resizeMode="stretch"
//           style={styles.usersProfileBGimage}
//         />
//         <View style={styles.info}>
//           <Image style={styles.img} source={img} />
//           <Text style={styles.itemText} numberOfLines={1}>
//             {item.name}
//           </Text>
//         </View>
//       </View>
//     );
//   };
//   const Separator = () => {
//     return <View style={styles.seperator} />;
//   };

//   let userProfilePage = item => {
//     dispatch({type: 'USSER_ID', payload: item.id});
//     navigation.navigate('AccounProfiletScreen');
//   };

//   const getpost = async () => {
//     setIsLoading(true);
//     const urlPosts = baseUrl2 + '/posts?page=' + currentPage;
//     console.log(urlPosts);
//     try {
//       const response = await fetch(urlPosts);
//       const json = await response.json();
//       setDataPosts([...dataPosts, ...json.data.data]);
//     } catch (error) {
//       console.log('error', error);
//       setIsLoading(false);
//     }
//   };
//   const renderItem = ({item}) => {
//     return (
//       <VideoComponent uri={item} key={item.id} style={styles.postContent} />
//     );
//   };
//   const renderLoader = () => {
//     return isLoading ? (
//       <View style={styles.loaderStyle}>
//         <ActivityIndicator size="large" color="#aaa" />
//       </View>
//     ) : null;
//   };

//   const loadMoreItem = () => {
//     setCurrentPage(currentPage + 1);
//     console.log(currentPage, ';;;lfdskkjf');
//   };

//   useEffect(() => {
//     getpost();
//   }, [currentPage]);
//   return (
//     <SafeAreaView style={styles.container}>
//       <HeaderChatSearch />
//       <StatusBar
//         backgroundColor="#009387"
//         barStyle={theme.dark ? 'light-content' : 'dark-content'}
//       />
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         horizontal={false}
//         // nestedScrollEnabled={true}
//         style={{width: '100%'}}>
//         <View style={styles.lastUsersContainerBody}>
//           <LinearGradient
//             style={styles.lastUsersContainer}
//             start={{x: 1, y: 0}}
//             end={{x: 1, y: 1}}
//             locations={[0.3, 0.8]}
//             colors={['#E0D0BA', '#E4E3E1']}>
//             <View style={styles.lastUsersContainercontent}>
//               <View style={styles.lastUsersContainerSmall} />
//               <Text style={styles.lastUsersContainerText}>
//                 Last Signed Users
//               </Text>
//             </View>
//           </LinearGradient>
//           <SafeAreaView style={styles.flatListContainer}>
//             <FlatList
//               data={data.data}
//               renderItem={({item}) => (
//                 <TouchableOpacity onPress={() => userProfilePage(item)}>
//                   <ItemRender name={item.name} userImage={item.image} />
//                 </TouchableOpacity>
//               )}
//               keyExtractor={item => item.id}
//               ItemSeparatorComponent={Separator}
//               horizontal={true}
//               showsHorizontalScrollIndicator={false}
//             />
//           </SafeAreaView>
//         </View>
//       </ScrollView>
//       <LinearGradient
//         style={styles.lastUsersContainer}
//         start={{x: 1, y: 0}}
//         end={{x: 1, y: 1}}
//         locations={[0.3, 0.8]}
//         colors={['#E0D0BA', '#E4E3E1']}>
//         <View style={styles.lastUsersContainercontent}>
//           <View style={styles.lastUsersContainerSmall} />
//           <Text style={styles.lastUsersContainerText}>Popular Posts</Text>
//         </View>
//       </LinearGradient>
//       <View />
//       <ScrollView horizontal={true}>
//         <FlatList
//           style={{width: '100%'}}
//           showsVerticalScrollIndicator={false}
//           data={dataPosts}
//           onEndReached={loadMoreItem}
//           keyExtractor={(items, index) => index.toString()}
//           ListFooterComponent={renderLoader}
//           onEndReachedThreshold={0}
//           renderItem={renderItem}
//         />
//       </ScrollView>
//       {/* <PostsComponent /> */}
//     </SafeAreaView>
//   );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     paddingHorizontal: 10,
//     paddingTop: 15,
//     backgroundColor: '#F2F2F2',
//     height: '100%',
//   },
//   lastUsersContainer: {
//     display: 'flex',
//     minWidth: '100%',
//     height: 57,
//     borderRadius: 8,
//     position: 'relative',
//     justifyContent: 'center',
//   },
//   lastUsersContainerSmall: {
//     height: 30,
//     width: 8,
//     borderBottomRightRadius: 5,
//     borderTopRightRadius: 5,
//     backgroundColor: '#ACA093',
//     marginRight: 10,
//   },
//   lastUsersContainerText: {
//     fontWeight: 'bold',
//     fontSize: 16,
//     color: '#838383',
//     fontFamily: 'Roboto-Bold',
//   },
//   lastUsersContainercontent: {
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   titleText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     padding: 12,
//   },
//   usersProfile: {
//     width: 72,
//     height: 170,
//     display: 'flex',
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     borderRadius: 8,
//   },
//   itemText: {
//     fontSize: 8,
//     width: 48,
//     color: '#464646',
//   },
//   flatListContainer: {
//     paddingVertical: 15,
//   },
//   img: {
//     height: 15,
//     width: 15,
//     borderRadius: 50,
//     marginHorizontal: 5,
//   },
//   usersProfileBGimage: {
//     flex: 1,
//     width: '100%',
//     borderTopRightRadius: 5,
//     borderTopLeftRadius: 5,
//   },
//   info: {
//     height: 30,
//     backgroundColor: '#DEDEDE',
//     width: '100%',
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderBottomRightRadius: 5,
//     borderBottomLeftRadius: 5,
//   },
//   seperator: {
//     width: 10,
//     height: 50,
//   },
//   loaderStyle: {
//     marginVertical: 16,
//     alignItems: 'center',
//   },
//   // postContent: {
//   //   aspectRatio: 1.2,
//   //   width: '100%',
//   // },
//   lastUsersContainerBody: {
//     height: '100%',
//     minHeight: 700,
//   },
// });
import React, {useState, useEffect, useMemo} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  SafeAreaView,
  Image,
  FlatList,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '@react-navigation/native';
import HeaderChatSearch from '../../../components/HeaderComponents/HeaderChatSearch';
import {baseUrl2} from '../../../http/index';
import {useDispatch} from 'react-redux';
import PostsComponent from '../../../components/PostsComponent';
import PushNotification from 'react-native-push-notification';
import VideoComponent from '../../../components/VideoComponent';

const ListItem = ({item}) => {
  return (
    <View style={styles.item}>
      <Image
        source={{
          uri: item.uri,
        }}
        style={styles.itemPhoto}
        resizeMode="cover"
      />
      <Text style={styles.itemText}>{item.text}</Text>
    </View>
  );
};

const HomeScreen = ({navigation}) => {
  const [data, setData] = useState('');
  const theme = useTheme();
  const dispatch = useDispatch();
  const [dataPosts, setDataPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // -------------- last Users Part --------------
  useEffect(() => {
    createChanels();
    fetchData();
  }, []);

  const url = baseUrl2 + '/users/list';
  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.log('error', error);
    }
  };

  const createChanels = () => {
    PushNotification.createChannel({
      channelId: 'test-channel',
      channelName: 'Test Channel',
    });
  };

  const ItemRender = item => {
    let img;
    if (item.userImage !== undefined) {
      img = {uri: item.userImage};
    } else {
      img = require('../../../assets/defoult.png');
    }
    return (
      <View style={styles.usersProfile}>
        <ImageBackground
          source={img}
          resizeMode="stretch"
          style={styles.usersProfileBGimage}
        />
        <View style={styles.info}>
          <Image style={styles.img} source={img} />
          <Text style={styles.itemText} numberOfLines={1}>
            {item.name}
          </Text>
        </View>
      </View>
    );
  };
  const Separator = () => {
    return <View style={styles.seperator} />;
  };
  let userProfilePage = item => {
    dispatch({type: 'USSER_ID', payload: item.id});
    navigation.navigate('AccounProfiletScreen');
  };

  // -------------- Popular Post Part --------------
  const getpost = async () => {
    setIsLoading(true);
    const urlPosts = baseUrl2 + `/posts?page=${currentPage}`;
    console.log(urlPosts);
    try {
      const response = await fetch(urlPosts);
      const json = await response.json();
      setDataPosts([...dataPosts, ...json.data.data]);
    } catch (error) {
      console.log('error', error);
      setIsLoading(false);
    }
  };
  const renderItem = ({item}) => {
    return <VideoComponent uri={item} key={item.id} />;
  };
  const memoizedValue = useMemo(() => renderItem, [data.data]);

  const renderLoader = () => {
    return isLoading ? (
      <View style={styles.loaderStyle}>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    ) : null;
  };

  const loadMoreItem = () => {
    setCurrentPage(currentPage + 1);
    console.log(currentPage, ';;;lfdskkjf');
  };

  useEffect(() => {
    getpost();
  }, [currentPage]);

  return (
    <View style={styles.container}>
      <HeaderChatSearch />
      <StatusBar
        backgroundColor="#009387"
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      <SafeAreaView style={{flex: 1}}>
        <SectionList
          contentContainerStyle={{paddingHorizontal: 10}}
          stickySectionHeadersEnabled={false}
          sections={SECTIONS}
          renderSectionHeader={({section}) => (
            <>
              <LinearGradient
                style={styles.lastUsersContainer}
                start={{x: 1, y: 0}}
                end={{x: 1, y: 1}}
                locations={[0.3, 0.8]}
                colors={['#E0D0BA', '#E4E3E1']}>
                <View style={styles.lastUsersContainercontent}>
                  <View style={styles.lastUsersContainerSmall} />
                  <Text style={styles.lastUsersContainerText}>
                    {section.title}
                  </Text>
                </View>
              </LinearGradient>
              <FlatList
                data={data.data}
                renderItem={({item}) => (
                  <TouchableOpacity onPress={() => userProfilePage(item)}>
                    <ItemRender name={item.name} userImage={item.image} />
                  </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={Separator}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </>
          )}
          renderItem={({section}) => (
            <>
              <LinearGradient
                style={styles.lastUsersContainer}
                start={{x: 1, y: 0}}
                end={{x: 1, y: 1}}
                locations={[0.3, 0.8]}
                colors={['#E0D0BA', '#E4E3E1']}>
                <View style={styles.lastUsersContainercontent}>
                  <View style={styles.lastUsersContainerSmall} />
                  <Text style={styles.lastUsersContainerText}>
                    Popular Posts
                  </Text>
                </View>
              </LinearGradient>
              <FlatList
                style={{width: '100%'}}
                showsVerticalScrollIndicator={false}
                data={dataPosts}
                onEndReached={info => loadMoreItem(info)}
                keyExtractor={(items, index) => index.toString()}
                ListFooterComponent={renderLoader}
                onEndReachedThreshold={0.5}
                renderItem={memoizedValue}
              />
            </>
          )}
        />
      </SafeAreaView>
    </View>
  );
};

const SECTIONS = [
  {
    title: 'Last Signed Users',
    data: [
      {
        key: '1',
      },
    ],
  },
];
export default HomeScreen;

const styles = StyleSheet.create({
  sectionHeader: {
    fontWeight: '800',
    fontSize: 18,
    color: '#f4f4f4',
    marginTop: 20,
    marginBottom: 5,
  },
  item: {
    margin: 10,
  },
  itemPhoto: {
    width: 200,
    height: 200,
  },
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    paddingTop: 15,
    backgroundColor: '#F2F2F2',
    height: '100%',
  },
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
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 12,
  },
  usersProfile: {
    width: 72,
    height: 170,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 8,
  },
  itemText: {
    fontSize: 8,
    width: 48,
    color: '#464646',
  },
  flatListContainer: {
    paddingVertical: 15,
  },
  img: {
    height: 15,
    width: 15,
    borderRadius: 50,
    marginHorizontal: 5,
  },
  usersProfileBGimage: {
    flex: 1,
    width: '100%',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  info: {
    height: 30,
    backgroundColor: '#DEDEDE',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
  seperator: {
    width: 10,
    height: 50,
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: 'center',
  },
  lastUsersContainerBody: {
    height: '100%',
    minHeight: 700,
  },
});
