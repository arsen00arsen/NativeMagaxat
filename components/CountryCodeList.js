// import React from 'react';
// import {CountryPicker} from 'react-native-country-codes-picker/components/CountryPicker';
// import {View, Text, TouchableOpacity} from 'react-native';
// export default function CountryCodeList() {
//   const [show, setShow] = React.useState(false);
//   const [countryCode, setCountryCode] = React.useState('');

//   return (
//     <View>
//       <TouchableOpacity
//         onPress={() => setShow(true)}
//         style={{
//           width: '80%',
//           height: 60,
//           backgroundColor: 'black',
//           padding: 10,
//         }}>
//         <Text
//           style={{
//             color: 'white',
//             fontSize: 20,
//           }}>
//           {countryCode}
//         </Text>
//       </TouchableOpacity>
//       <CountryPicker
//         show={show}
//         pickerButtonOnPress={item => {
//           setCountryCode(item.dial_code);
//           setShow(false);
//         }}
//       />
//     </View>
//   );
// }
