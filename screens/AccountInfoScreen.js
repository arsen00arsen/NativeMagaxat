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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useForm} from 'react-hook-form';
import CustomInput from '../components/loginComponents/CustomInput';
import {Picker} from '@react-native-picker/picker';
import {useSelector, useDispatch} from 'react-redux';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const AccountInfoScreen = ({navigation}) => {
  const {control, handleSubmit} = useForm();
  const [selectedValue, setSelectedValue] = React.useState('');
  // const name = useSelector(state => state.usser);
  // console.log(name);
  const dispatch = useDispatch();
  const submitFormHandler = handleSubmit(data => {
    dispatch({type: 'USSER_SIGN_UP_MAILPHONE', payload: data});
  });

  function nextStep() {
    submitFormHandler();
    control?._formState.errors !== {}
      ? navigation.navigate('IneterestingAreaScreen')
      : navigation.navigate(null);
  }
  return (
    <LinearGradient
      start={{x: 1, y: 1}}
      end={{x: 1, y: 0}}
      colors={['#D6AB6F', '#B8B8B8', '#674C31']}
      style={styles.linearGradient}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.headerWidthButton}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="home-outline" color={'#FFFFFF'} size={20} />
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
          <View>
            <View style={styles.action}>
              <Text style={styles.inputHeader}>Gender</Text>
              <Picker
                selectedValue={selectedValue}
                style={styles.pickerSelectStyles}
                onValueChange={(itemValue, itemIndex) => {
                  setSelectedValue(itemValue);
                  dispatch({
                    type: 'USSER_SIGN_UP_GENDER',
                    payload: {gender: itemValue},
                  });
                }}>
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
              </Picker>
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
            <TouchableOpacity style={styles.button} onPress={nextStep}>
              <View />
              <Text style={styles.textSign}>Next</Text>
              <Icon name="home-outline" color={'#FFFFFF'} size={20} />
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
    // marginBottom:30
  },
  titlecontent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    width: 228,
    height: 160,
    marginVertical: 20,
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
  arrowIcon: {
    marginRight: 20,
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 21,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'column',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
    backgroundColor: '#FFFFFF',
    width: 250,
    height: 60,
    borderRadius: 4,
    alignItems: 'flex-start',
  },
  textInput: {
    flex: 1,
    // marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    paddingTop: 5,
    color: '#05375a',
    height: '100%',
    width: '100%',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  eyeIcon: {
    paddingRight: 20,
    paddingTop: 3,
  },
  inputHeader: {
    fontSize: 12,
    color: '#828282',
    paddingTop: 10,
    paddingLeft: 12,
  },
  passHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  pickerSelectStyles: {
    width: '100%',
    height: 0,
    position: 'absolute',
    bottom: -10,
    fontSize: 8,
    left: -5,
  },
  scrollView: {
    width: '100%',
  },
});
