import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import {useTheme} from '@react-navigation/native';
import {
  loginSuccess,
  registerUser,
  startLogin,
} from '../stores/user/userActions';
import CustomInput from '../components/loginComponents/CustomInput';
import {LoginAvatar} from '../components/ImageVedioUpload/LoginAvatar';
import {baseUrl2} from '../http/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PriorityPageScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const user = useSelector(state => state?.user);
  const {control, handleSubmit, watch} = useForm();
  let pwd = watch('password');
  const submitFormHandler = handleSubmit(async data => {
    const fdata = new FormData();
    fdata.append('image', {
      uri: user.data.uri,
      type: user.data.type,
      name: user.data.name,
    });
    fdata.append('name', data.name);
    fdata.append('email', data.email);
    fdata.append('password', data.password);
    fdata.append('confirmPassword', data.confirmPassword);
    fdata.append('lastname', data.lastname);
    fdata.append('phone_number', data.phone_number);
    fdata.append('type', 'shop');
    const res = await fetch(baseUrl2 + '/register', {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: fdata,
    });
    dispatch(startLogin());
    try {
      const {sucsessData} = await res.json();
      console.log(sucsessData, 'sucsessData');
      dispatch(loginSuccess(sucsessData.data));
      await AsyncStorage.setItem('token', sucsessData.token);
    } catch (error) {
      console.log(error, 'eeeee');
      alert('Invalid password or Login');
    }
  });

  return (
    <LinearGradient
      start={{x: 1, y: 1}}
      end={{x: 1, y: 0}}
      colors={['#2F4F4F', '#2F4F4F', '#696969']}
      style={styles.linearGradient}>
      <StatusBar
        backgroundColor="transparent"
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.headerWidthButton}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="chevron-left" color={'#FFFFFF'} size={45} />
            </TouchableOpacity>
            <View style={styles.titlecontent}>
              <Text style={styles.text}>Creat your shop</Text>
            </View>
            <View />
          </View>
          <View>
            {/* <Animatable.Image
              animation="fadeInUpBig"
              duraton="1500"
              source={require('../assets/priority.png')}
              style={styles.logo}
              resizeMode="stretch"
            /> */}
            <LoginAvatar />
          </View>
          <View>
            <CustomInput
              style={styles.nameInput}
              name="name"
              control={control}
              title="First Name"
              rules={{
                required: 'Name required',
                minLength: {
                  value: 1,
                  message: 'Name cannot be empoty',
                },
              }}
            />
            <CustomInput
              name="lastname"
              control={control}
              title="Last Name"
              rules={{
                required: 'Last Name required',
                minLength: {
                  value: 1,
                  message: 'Last Name cannot be empoty',
                },
              }}
            />
            <CustomInput
              name="email"
              control={control}
              title="Email"
              rules={{
                required: 'Email is required',
                pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
              }}
            />
            <CustomInput
              name="phone_number"
              control={control}
              type="number"
              title="Phone"
              rules={{
                required: 'Phone Number is required',
                minLength: {
                  value: 5,
                  message: 'Phone Number should be at least 3 characters long',
                },
              }}
            />
            <CustomInput
              name="password"
              control={control}
              style={styles.nameInput}
              secureTextEntry
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password should be at least 8 characters',
                },
              }}
              title="Password"
            />
            <CustomInput
              name="confirmPassword"
              control={control}
              style={styles.nameInput}
              secureTextEntry
              rules={{
                validate: value =>
                  value === pwd || 'The passwords do not match',
              }}
              title="Confirm Your Password"
            />
            <TouchableOpacity style={styles.button} onPress={submitFormHandler}>
              <View />
              <Text style={styles.textSign}>Start</Text>
              <Icon name="arrow-right" color={'#FFFFFF'} size={25} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default PriorityPageScreen;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '70%',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  headerWidthButton: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titlecontent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 40,
  },
  logo: {
    width: 245,
    // height: 200,
  },
  icon: {
    paddingLeft: 10,
    bottom: 15,
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    borderRadius: 20,
    borderColor: '#DFFF00',
    borderWidth: 1,
    width: 250,
    height: 57,
    backgroundColor: '#758468',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 21,
  },
  action: {
    flexDirection: 'column',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    alignItems: 'flex-start',
  },
  inputHeader: {
    fontSize: 12,
    color: '#828282',
    paddingTop: 10,
    paddingLeft: 12,
  },
  pickerSelectStyles: {
    width: '100%',
    color: 'black',
  },
  scrollView: {
    width: '100%',
  },
  // logo: {
  //   paddingTop: 20,
  //   height: 150,
  //   // width: 150,
  //   borderRadius: 100,
  //   padding: 20,
  // },
});
