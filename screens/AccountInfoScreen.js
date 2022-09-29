import React from 'react';
import {Picker} from '@react-native-picker/picker';
import {useDispatch, useSelector} from 'react-redux';
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
import {Controller, useForm} from 'react-hook-form';
import CustomInput from '../components/loginComponents/CustomInput';
import {LoginAvatar} from '../components/ImageVedioUpload/LoginAvatar';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const AccountInfoScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {control, handleSubmit} = useForm({
    defaultValues: {
      gender: 'male',
    },
  });

  const submitFormHandler = handleSubmit(data => {
    dispatch({type: 'FIRST_STEP_SUBMIT', payload: data});
    navigation.navigate('IneterestingAreaScreen');
  });
  const {user} = useSelector(state => state);
  return (
    <LinearGradient
      start={{x: 1, y: 1}}
      end={{x: 1, y: 0}}
      colors={['#cbb085', '#B8B8B8', '#cbb085']}
      style={styles.linearGradient}>
      <StatusBar backgroundColor="#cbb085" barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.headerWidthButton}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="chevron-left" color={'#FFFFFF'} size={45} />
            </TouchableOpacity>
            <View style={styles.titlecontent}>
              <Text style={styles.text}>Account</Text>
              <Text style={styles.text}>Information</Text>
            </View>
            <View />
          </View>
          <Animatable.Image
            animation="fadeInUpBig"
            duraton="1500"
            source={require('../assets/account.png')}
            style={styles.logo}
            resizeMode="stretch"
          />
          {/* <View style={styles.logo}>
            <LoginAvatar />
          </View> */}
          <View>
            <View style={styles.action}>
              <Text style={styles.inputHeader}>Gender</Text>
              <Controller
                control={control}
                name="gender"
                render={({field: {onChange, value, onBlur}}) => {
                  return (
                    <Picker
                      selectedValue={value}
                      style={styles.pickerSelectStyles}
                      onValueChange={onChange}
                      onBlur={onBlur}>
                      <Picker.Item label="Male" value="male" />
                      <Picker.Item label="Female" value="female" />
                    </Picker>
                  );
                }}
              />
            </View>
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
          </View>
          <View>
            <TouchableOpacity style={styles.button} onPress={submitFormHandler}>
              <View />
              <Text style={styles.textSign}>Next</Text>
              <Icon name="arrow-right" color={'#FFFFFF'} size={25} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default AccountInfoScreen;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 50,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '70%',
    paddingHorizontal: 20,
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
    paddingTop: 20,
    height: 150,
    // width: 180,
    borderRadius: 100,
    padding: 20,
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
    borderRadius: 50,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    width: 237,
    height: 57,
    justifyContent: 'space-around',
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
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
    backgroundColor: '#FFFFFF',
    paddingBottom: 30,
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
    height: '100%',
    position: 'absolute',
    bottom: -10,
    fontSize: 8,
    left: -5,
    color: 'black',
  },
  scrollView: {
    width: '100%',
  },
});
