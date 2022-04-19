// import React from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   StatusBar,
//   SafeAreaView,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
// } from 'react-native';
// import {useTheme} from '@react-navigation/native';
// import HeaderBackSearch from '../../components/HeaderComponent/HeaderBackSearch';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// // import * as ImagePicker from 'expo-image-picker';
// // import MediaContent from '../../components/MediaContent';

// const MediaScreen = ({navigation}) => {
//   const theme = useTheme();
//   const [text, onChangeText] = React.useState('');
//   const [image, setImage] = React.useState(null);

//   //   const pickImage = async () => {
//   //     let result = await ImagePicker.launchImageLibraryAsync({
//   //       mediaTypes: ImagePicker.MediaTypeOptions.All,
//   //       allowsEditing: true,
//   //       aspect: [4, 3],
//   //       quality: 1,
//   //     });

//   //     if (!result.cancelled) {
//   //       setImage(result.uri);
//   //     }
//   //   };

//   return (
//     <View style={styles.container}>
//       <StatusBar
//         backgroundColor="#009387"
//         barStyle={theme.dark ? 'light-content' : 'dark-content'}
//       />
//       <HeaderBackSearch />
//       <ScrollView showsVerticalScrollIndicator={false}>
//         <View style={styles.postContainer}>
//           <View style={styles.postBody}>
//             <View style={styles.addPost}>
//               <View style={styles.imgBody}>
//                 <Image
//                   style={styles.img}
//                   source={require('../../assets/FakeImages/Nikol.png')}
//                 />
//               </View>
//               <SafeAreaView>
//                 <TextInput
//                   style={styles.input}
//                   onChangeText={onChangeText}
//                   value={text}
//                   placeholder={'Type your post message ...'}
//                 />
//               </SafeAreaView>
//             </View>
//             <View style={styles.addImgVedio}>
//               <TouchableOpacity style={styles.postImg}>
//                 {/* <Icon name="camera" size={24} color="#B9B9B9" /> */}
//                 <Text style={styles.textAdd}>Add Photo</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.postVedio}>
//                 {/* <Icon name="device-camera-video" size={24} color="#B9B9B9" /> */}
//                 <Text style={styles.textAdd}>Add Vedio</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//           {/* <MediaContent /> */}
//           <View style={{alignItems: 'center', justifyContent: 'center'}}>
//             {image && (
//               <Image source={{uri: image}} style={{width: 160, height: 100}} />
//             )}
//           </View>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// export default MediaScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     paddingHorizontal: 15,
//     paddingTop: 15,
//     backgroundColor: '#F2F2F2',
//     height: '100%',
//   },
//   postContainer: {
//     width: '100%',
//     height: '90%',
//   },
//   postBody: {
//     width: '100%',
//     height: 125,
//     backgroundColor: '#E8E5E1',
//     borderRadius: 8,
//   },
//   addPost: {
//     padding: 18,
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     height: '65%',
//   },
//   imgBody: {
//     width: 71,
//     height: 71,
//     borderColor: 'silver',
//     borderWidth: 4,
//     borderRadius: 50,
//     position: 'relative',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 20,
//   },
//   img: {
//     position: 'absolute',
//     width: 65,
//     height: 65,
//     borderRadius: 50,
//   },
//   input: {
//     color: '#CECECE',
//     fontSize: 14,
//   },
//   addImgVedio: {
//     height: '35%',
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   postImg: {
//     width: '50%',
//     height: '100%',
//     backgroundColor: '#DEDCDC',
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     borderRightWidth: 2,
//     borderColor: 'silver',
//     borderBottomLeftRadius: 8,
//     paddingLeft: 10,
//   },
//   postVedio: {
//     width: '50%',
//     height: '100%',
//     backgroundColor: '#DEDCDC',
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     borderBottomRightRadius: 8,
//     paddingLeft: 10,
//   },
//   textAdd: {
//     color: '#B9B9B9',
//     fontSize: 10,
//     fontWeight: 'bold',
//     paddingLeft: 20,
//   },
// });
