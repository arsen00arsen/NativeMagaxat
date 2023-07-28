// import React, {useContext} from 'react';
// import {View, TextInput, StyleSheet, Text, Keyboard} from 'react-native';
// import {Controller} from 'react-hook-form';
// import TextField from './TextField';

// const CustomInput = ({
//   control,
//   name,
//   value,
//   keyboardType,
//   rules = {},
//   placeholder,
//   secureTextEntry,
// }) => {
// //   const {theme} = useContext(Themecontext);
// //   let activColors = colors[theme.mode];
//   return (
//     <Controller
//       control={control}
//       name={name}
//       //value={value}
//       rules={rules}
//       render={({field: {onChange, onBlur}, fieldState: {error}}) => (
//         <View>
//           {error ? (
//             <Text style={styles.error__text}>{error?.message}</Text>
//           ) : null}
//           <TextField />
//         </View>
//       )}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   default__input: {
//     borderWidth: 1,
//     borderRadius: 8,
//     fontStyle: 'normal',
//     fontSize: 15,
//     padding: 15,
//     marginBottom: 10,
//   },
//   error__text: {
//     color: '#ff2400',
//     marginBottom: 3,
//   },
// });

// export default CustomInput;
