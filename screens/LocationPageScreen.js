import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useForm} from 'react-hook-form';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/Entypo';
import {Picker} from '@react-native-picker/picker';
import {useSelector, useDispatch} from 'react-redux';
import CountryCodeList from '../components/CountryCodeList';
import {registerUser} from '../stores/user/userActions';
const LocationPageScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.data);
  const {handleSubmit} = useForm({
    defaultValues: {
      country_id: 1,
    },
  });

  const signIn = handleSubmit(data => {
    if (user.country_id === undefined) {
      dispatch(registerUser({...user, ...data}));
    } else {
      dispatch(registerUser(user));
    }
  });

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
              <Text style={styles.text}>Choose Location</Text>
            </View>
            <View />
          </View>
          <View style={styles.inputSIcon}>
            <Animatable.Image
              animation="fadeInUpBig"
              duraton="1500"
              source={require('../assets/Location.png')}
              style={styles.logo}
              resizeMode="stretch"
            />
            <CountryCodeList />
            {/* <View style={styles.action}>
              <Text style={styles.inputHeader}>Language</Text>
              <Controller
                control={control}
                name="language"
                render={({field: {onChange, value, onBlur}}) => {
                  return (
                    <Picker
                      selectedValue={value}
                      style={styles.pickerSelectStyles}
                      onValueChange={onChange}
                      onBlur={onBlur}>
                      <Picker.Item label="English" value="1" />
                    </Picker>
                  );
                }}
              />
            </View> */}
            {/* <View style={styles.chackContainer}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 14,
                  marginTop: -6,
                  textDecorationLine: 'underline',
                }}
                onPress={() =>
                  Linking.openURL('https://sponsor.am/en/privacy-policy')
                }>
                I agree with terms conditions and privacy policy
              </Text>
              <TouchableOpacity
                style={styles.chekbox}
                onPress={() => setCheck(!check)}>
                {check === true ? (
                  <Icon1 name="check" color="black" size={18} />
                ) : null}
              </TouchableOpacity>
            </View> */}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.signIn} onPress={signIn}>
              <LinearGradient
                colors={['#88673A', '#3C3835']}
                style={styles.signIn}>
                <Text style={styles.textSign}>Log In</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.startButton}
              onPress={() => navigation.navigate('SignInScreen')}>
              <Text style={styles.textStartButton}>Start</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};
export default LocationPageScreen;
const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '70%',
    paddingHorizontal: 20,
    marginVertical: 80,
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
    marginBottom: 30,
    marginRight: 40,
  },
  logo: {
    // width: 193,
    height: 160,
    marginLeft: 30,
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
    justifyContent: 'space-sround',
  },
  action: {
    flexDirection: 'column',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    alignItems: 'flex-start',
    height: 100,
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
  signIn: {
    width: 237,
    height: 57,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  startButton: {
    width: 237,
    height: 57,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: 'white',
    marginTop: 10,
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 21,
  },
  buttonContainer: {
    paddingTop: 20,
  },
  textStartButton: {
    color: 'black',
    fontWeight: '400',
    fontSize: 18,
  },
  chackContainer: {
    width: '70%',
    display: 'flex',
    flexDirection: 'row-reverse',
    marginTop: 15,
  },
  chekbox: {
    width: 25,
    height: 25,
    borderColor: 'black',
    backgroundColor: 'white',
    borderWidth: 1,
    marginRight: 20,
  },
});
