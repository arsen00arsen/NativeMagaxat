// import React from 'react';
// import {View, Text, Image, StyleSheet} from 'react-native';
// import HeaderBackSearch from '../../components/HeaderComponents/HeaderBackSearch';

// const ChatScreen = () => {
//   return (
//     <View style={styles.container}>
//       <HeaderBackSearch />
//       <View style={styles.messageBody}>
//         <View style={styles.messageContainer}>
//           <View>
//             <Image
//               style={styles.userImg}
//               source={require('../../assets/FakeImages/Nikol.png')}
//             />
//           </View>
//           <View style={styles.userInfo}>
//             <Text style={styles.userName}>Nikol Pashinyan</Text>
//             <Text style={styles.userMessageView}>
//               Hello! Finally found the time to...
//             </Text>
//           </View>
//           <View style={styles.messageInfo}>
//             <Text style={styles.messageTime}>4:20</Text>
//             <View style={styles.messageCountBody}>
//               <Text style={styles.messageCount}>2</Text>
//             </View>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default ChatScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 15,
//     paddingTop: 15,
//     position: 'relative',,
//   },
//   messageBody: {
//     height: '90%',
//     width: '100%',,
//   },
//   messageContainer: {
//     width: '100%',
//     height: 100,
//     backgroundColor: '#E6E6E6',
//     borderRadius: 8,
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 15,
//   },
//   userImg: {
//     width: 72,
//     height: 72,
//     borderRadius: 50,
//   },
//   userInfo: {
//     width: 190,
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'flex-start',
//   },
//   userName: {
//     color: '#343333',
//     fontSize: 16,
//     fontWeight: 'bold',,
//   },
//   userMessageView: {
//     color: '#696969',
//     fontSize: 12,
//   },
//   messageInfo: {
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'flex-start',
//   },
//   messageTime: {
//     color: '#343333',
//     fontSize: 12,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   messageCountBody: {
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: 17,
//     height: 17,
//     borderRadius: 50,
//     backgroundColor: 'tomato',,
//   },
//   messageCount: {
//     fontSize: 13,
//     color: '#FFFFFF',,
//   },
// });
