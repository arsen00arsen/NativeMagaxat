import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import HeaderBackSearch from '../../../components/HeaderComponents/HeaderBackSearch';
import MyaccountUsserInfor from '../../../components/MyaccountUsserInfor';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/Feather';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {logoutUser} from '../../../stores/user/userActions';
import LinearGradient from 'react-native-linear-gradient';
const SettingsScreen = ({navigation}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [user, setuser] = useState('');
  // useEffect(() => {
  //   const unregister = auth().onAuthStateChanged(userExist => {
  //     if (userExist) {
  //       firestore().collection('users').doc(userExist.uid).update({
  //         status: 'online',
  //       });
  //       setuser(userExist);
  //     } else {
  //       setuser('');
  //     }
  //   });

  //   return () => {
  //     unregister();
  //   };
  // }, []);
  // const logOut = () => {
  //   firestore()
  //     .collection('users')
  //     .doc(user.uid)
  //     .update({
  //       status: firestore.FieldValue.serverTimestamp(),
  //     })
  //     .then(() => {
  //       auth().signOut();
  //     });
  // };
  const logOut = () => {
    dispatch(logoutUser());
  };
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#009387"
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      <HeaderBackSearch />
      <ScrollView showsVerticalScrollIndicator={false} style={{width: '100%'}}>
        <View style={{marginBottom: 20}}>{/* <MyaccountUsserInfor /> */}</View>
        <View style={styles.action}>
          <Text style={styles.inputHeader}>Language</Text>
          {/* <RNPickerSelect
            placeholder={{label: '', value: 'Interesting Area 5'}}
            useNativeAndroidPickerStyle={false}
            style={{
              ...pickerSelectStyles,
              iconContainer: {
                top: 10,
                right: 20,
              },
            }}
            onValueChange={value => console.log(value)}
            items={[
              {label: 'English', value: 'english'},
              {label: 'Armenian', value: 'armenian'},
            ]}
            Icon={() => {
              return (
                <Icon
                  name="chevron-down"
                  size={18}
                  color="#909090"
                  style={styles.icon}
                />
              );
            }}
          /> */}
          <Text style={styles.textInput}> English</Text>
        </View>
        {/* <View style={styles.action}>
          <Text style={styles.inputHeader}>Password</Text>
          <TextInput
            placeholderTextColor="#666666"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={val => console.log(val)}
            placeholder="Change Password"
          />
        </View> */}
        {/* <View style={styles.action}>
          <Text style={styles.inputHeader}>About</Text>
          <TextInput
            placeholderTextColor="#666666"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={val => console.log(val)}
            placeholder="About Us"
          />
        </View> */}
        <TouchableOpacity onPress={logOut} style={styles.action}>
          <LinearGradient colors={['#88673A', '#3C3835']} style={styles.signIn}>
            <Text style={styles.textSign}>Log Out</Text>
            {/* {isLoading === true ? <LoaderComponent /> : null}  */}
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
    paddingTop: 15,
    backgroundColor: '#F2F2F2',
    height: '100%',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingLeft: 10,
    color: '#222222',
    height: '100%',
    width: '100%',
    borderRadius: 8,
    fontSize: 14,
    fontWeight: '700',
  },
  action: {
    flexDirection: 'column',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    backgroundColor: '#FFFFFF',
    width: '100%',
    minHeight: 60,
    borderRadius: 8,
    alignItems: 'flex-start',
  },
  inputHeader: {
    fontSize: 12,
    color: '#828282',
    paddingTop: 7,
    paddingLeft: 12,
  },
  icon: {
    paddingLeft: 10,
    bottom: 15,
  },
  signIn: {
    width: '100%',
    borderRadius: 8,
    minHeight: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 21,
    textAlign: 'center',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    paddingHorizontal: 12,
    color: 'black',
    fontWeight: '700',
    fontSize: 16,
    paddingVertical: 8,
    bottom: 5,
    minWidth: 350,
  },
});
