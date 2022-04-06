import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import Avatar from '../components/Avatar';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from 'react-native-date-picker';
import {useForm} from 'react-hook-form';
import CustomInput from '../components/loginComponents/CustomInput';
import {useSelector, useDispatch} from 'react-redux';

const SignUpScreen = ({navigation}) => {
  const [date, setDate] = React.useState(new Date());
  const [open, setOpen] = React.useState(false);
  const {control, handleSubmit} = useForm();
  const name = useSelector(state => state.usser);
  const dispatch = useDispatch();
  const submitFormHandler = handleSubmit(data => {
    dispatch({type: 'USSER_SIGN_UP_FLNAMES', payload: data});
  });

  function nextStep() {
    submitFormHandler();
    control?._formState.errors !== {}
      ? navigation.navigate('AccountInfoScreen')
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
              <Text style={styles.text}>Create Your Profile</Text>
              <Animatable.Image
                animation="fadeInUpBig"
                duraton="1500"
                source={require('../assets/logo.png')}
                style={styles.logo}
                resizeMode="stretch"
              />
            </View>
            <View />
          </View>
          {/* <Avatar width={180} height={180} /> */}
          <View>
            <CustomInput
              name="name"
              control={control}
              // placeholder="Name"
              rules={true}
              title="First Name"
            />
            <CustomInput
              name="lastName"
              control={control}
              title="Last Name"
              rules={true}
            />
            <View>
              <TouchableOpacity
                style={styles.action}
                onPress={() => setOpen(true)}>
                <View>
                  <Text style={styles.inputHeader}>Date</Text>
                  <TextInput
                    placeholderTextColor="#666666"
                    style={styles.textInput}
                    autoCapitalize="none"
                  />
                </View>
              </TouchableOpacity>
              <DatePicker
                mode="date"
                modal
                open={open}
                date={date}
                onConfirm={dates => {
                  setOpen(false);
                  setDate(dates);
                  dispatch({
                    type: 'USSER_SIGN_UP_DATE',
                    payload: {birthDate: dates},
                  });
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            </View>
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

export default SignUpScreen;

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
    marginBottom: 30,
  },
  titlecontent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: 57,
    marginTop: 20,
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
    borderBottomColor: '#f2f2f2',
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
    color: '#05375a',
    height: '100%',
    width: '100%',
    paddingTop: 5,
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
    paddingTop: 8,
    paddingLeft: 12,
  },
  passHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 28,
  },
  scrollView: {
    width: '100%',
  },
});
