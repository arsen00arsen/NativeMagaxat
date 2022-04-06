// import React from 'react';
// import {View, StyleSheet, TextInput} from 'react-native';
// import ModalSelector from 'react-native-modal-selector';

// const CountryCodeList = ({navigation}) => {
//   const [country, setCountry] = React.useState('');

//   let index = 0;
//   const data = [
//     {key: index++, section: true, label: 'Fruits'},
//     {key: index++, label: 'Red Apples'},
//     {key: index++, label: 'Cherries'},
//     {
//       key: index++,
//       label: 'Cranberries',
//       accessibilityLabel: 'Tap here for cranberries',
//     },
//     {key: index++, label: 'Vegetable', customKey: 'Not a fruit'},
//     ,
//   ];

//   return (
//     <View style={{flex: 1, justifyContent: 'space-around', padding: 50}}>
//       <ModalSelector
//         data={data}
//         initValue="Select something yummy!"
//         onChange={option => {
//           alert(`${option.label} (${option.key}) nom nom nom`);
//         }}
//       />
//       <ModalSelector
//         data={data}
//         initValue="Select something yummy!"
//         supportedOrientations={['landscape']}
//         accessible={true}
//         scrollViewAccessibilityLabel={'Scrollable options'}
//         cancelButtonAccessibilityLabel={'Cancel Button'}
//         onChange={option => {
//           setCountry({country: option.label});
//         }}>
//         <TextInput
//           style={{
//             borderWidth: 1,
//             borderColor: '#ccc',
//             padding: 10,
//             height: 30,
//           }}
//           editable={false}
//           placeholder="Select something yummy!"
//           value={country}
//         />
//       </ModalSelector>
//       <ModalSelector
//         data={data}
//         ref={selector => {
//           this.selector = selector;
//         }}
//         customSelector={<Switch onValueChange={() => this.selector.open()} />}
//       />
//     </View>
//   );
// };

// export default CountryCodeList;

// const styles = StyleSheet.create({
//   linearGradient: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   content: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     height: '70%',
//     paddingHorizontal: 20,
//   },
//   headerWidthButton: {
//     display: 'flex',
//     width: '100%',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   inputSIcon: {
//     display: 'flex',
//     alignItems: 'center',
//   },
//   titlecontent: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   logo: {
//     width: 193,
//     height: 160,
//   },
//   icon: {
//     paddingLeft: 10,
//     bottom: 15,
//   },
//   text: {
//     color: 'white',
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   button: {
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 15,
//     borderRadius: 50,
//     borderColor: '#FFFFFF',
//     borderWidth: 1,
//     width: 237,
//     height: 57,
//     justifyContent: 'space-sround',
//   },
//   arrowIcon: {
//     marginRight: 20,
//   },
//   action: {
//     flexDirection: 'column',
//     marginTop: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f2f2f2',
//     backgroundColor: '#FFFFFF',
//     width: 250,
//     height: 60,
//     borderRadius: 4,
//     alignItems: 'flex-start',
//   },
//   inputHeader: {
//     fontSize: 12,
//     color: '#828282',
//     paddingTop: 10,
//     paddingLeft: 12,
//   },
//   pickerSelectStyles: {
//     width: '100%',
//     height: 0,
//     position: 'absolute',
//     bottom: -10,
//     fontSize: 8,
//     left: -5,
//   },
//   scrollView: {
//     width: '100%',
//   },
//   signIn: {
//     width: 237,
//     height: 57,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 30,
//   },
//   textSign: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 18,
//     lineHeight: 21,
//   },
// });
