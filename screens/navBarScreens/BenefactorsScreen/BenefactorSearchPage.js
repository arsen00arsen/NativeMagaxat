// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   StatusBar,
//   TouchableOpacity,
//   FlatList,
// } from 'react-native';
// import {useTheme} from '@react-navigation/native';
// import {baseUrl2} from '../../../http/index';
// import {useNavigation} from '@react-navigation/native';
// import {useDispatch} from 'react-redux';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import SearchComponent from '../../../components/SearchComponent';
// import {SearchBenefactors} from '../../../http/searchService/searchService';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const BenefactorSearchPage = () => {
//   const [data, setData] = useState('');
//   const [list, setList] = useState([]);
//   const theme = useTheme();
//   const navigation = useNavigation();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const url = baseUrl2 + '/videos_api?title=' + data;
//     const fetchData = async () => {
//       try {
//         const token = await AsyncStorage.getItem('token');
//         const response = await fetch(url, {
//           headers: {
//             Authorization: 'Bearer ' + token,
//           },
//         });
//         const json = await response.json();
//         setList(json);
//       } catch (error) {
//         console.log('error', error);
//       }
//     };
//     fetchData();
//   }, [data]);

//   const ItemRender = item => {
//     let img;
//     if (item.userImage !== undefined) {
//       img = {uri: item.userImage};
//     } else {
//       img = require('../../../assets/defoult.png');
//     }
//     return (
//       <View style={styles.usersProfile}>
//         <View style={styles.info}>
//           <Image source={img} style={styles.usersProfilemage} />
//           <View style={styles.usserdata}>
//             <Text style={styles.itemText}>{item.name}</Text>
//             <Text style={styles.itemText}>{item.lastName}</Text>
//           </View>
//           <MaterialCommunityIcons
//             name="account-arrow-right"
//             size={35}
//             color="#BB9E79"
//             style={styles.itemIcon}
//           />
//         </View>
//       </View>
//     );
//   };

//   const Separator = () => {
//     return <View style={styles.seperator} />;
//   };
//   let userProfilePage = item => {
//     dispatch({type: 'USSER_ID', payload: item.id});
//     navigation.navigate('BenefactorUserPageScreen');
//   };
//   return (
//     <View style={styles.container}>
//       <StatusBar
//         backgroundColor="#009387"
//         barStyle={theme.dark ? 'light-content' : 'dark-content'}
//       />
//       <View style={styles.serachContainer}>
//         <SearchComponent
//           setText={setData}
//           searchText="Search Your Benefactors ..."
//         />
//       </View>
//       <FlatList
//         style={styles.flatlist}
//         data={list.data}
//         renderItem={({item}) => (
//           <TouchableOpacity onPress={() => userProfilePage(item)}>
//             <ItemRender
//               name={item.name}
//               lastName={item.last_name}
//               userImage={item.image}
//             />
//           </TouchableOpacity>
//         )}
//         keyExtractor={item => item.id}
//         ItemSeparatorComponent={Separator}
//         vertical={true}
//         showsVerticalScrollIndicator={false}
//       />
//     </View>
//   );
// };

// export default BenefactorSearchPage;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 15,
//     paddingTop: 15,
//     backgroundColor: '#F2F2F2',
//     height: '100%',
//   },
//   usersProfilemage: {
//     width: 50,
//     height: 50,
//     borderRadius: 50,
//     marginRight: 30,
//   },
//   info: {
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     paddingHorizontal: 10,
//   },
//   itemText: {
//     fontSize: 18,
//     marginRight: 'auto',
//     fontWeight: '500',
//   },
//   flatlist: {
//     paddingHorizontal: 15,
//     width: '100%',
//   },
//   usersProfile: {
//     marginBottom: 20,
//     borderBottomWidth: 1,
//     paddingBottom: 10,
//     borderBottomColor: '#E0D0BA',
//   },
//   usserdata: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   itemIcon: {
//     marginLeft: 'auto',
//   },
//   serachContainer: {
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//   },
// });
