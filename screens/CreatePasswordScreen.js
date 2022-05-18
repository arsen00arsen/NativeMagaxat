import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Feather';
import {useDispatch} from 'react-redux';

const CreatePasswordScreen = ({navigation}) => {
  const [password, setpassword] = useState('');
  const [passwordErrorMessage, setpasswordErrorMessage] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [confirmPasswordErrorMessage, setconfirmPasswordErrorMessage] =
    useState('');
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  let formValidation = async () => {
    setloading(true);
    let errorFlag = false;
    if (password.length === 0) {
      errorFlag = true;
      setpasswordErrorMessage('Password is required feild');
    } else if (password.length < 8 || password.length > 20) {
      errorFlag = true;
      setpasswordErrorMessage('Password should be min 8 char and max 20 char');
    } else if (password !== confirmPassword) {
      errorFlag = true;
      setpasswordErrorMessage('Passwoad and confirm password should be same.');
    }

    if (confirmPassword.length === 0) {
      errorFlag = true;
      setconfirmPasswordErrorMessage('Confirm Password is required feild');
    } else if (confirmPassword.length < 8 || confirmPassword.length > 20) {
      errorFlag = true;
      setconfirmPasswordErrorMessage(
        'Password should be min 8 char and max 20 char',
      );
    }

    if (errorFlag) {
    } else {
      setloading(false);
    }
  };
  let nextStep = async () => {
    await formValidation();
    passwordErrorMessage !== '' && confirmPasswordErrorMessage !== ''
      ? navigation.navigate('CreatePasswordScreen')
      : navigation.navigate('LocationPageScreen');
    dispatch({
      type: 'USSER_SIGN_UP_PASSWORD',
      payload: {password: password},
    });
  };

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
              <Icon name="chevron-left" color={'#FFFFFF'} size={45} />
            </TouchableOpacity>
            <Text style={styles.text}>Password</Text>
            <View />
          </View>
          <Animatable.Image
            animation="fadeInUpBig"
            duraton="1500"
            source={require('../assets/passWord.png')}
            style={styles.logo}
            resizeMode="stretch"
          />
          <View>
            <View style={styles.action}>
              <View style={styles.passHeader}>
                <Text style={styles.inputHeader}>Password</Text>
              </View>
              <TextInput
                placeholderTextColor="#666666"
                value={password}
                style={styles.textInput}
                secureTextEntry={true}
                autoCapitalize="none"
                onChangeText={password => setpassword(password)}
              />
            </View>
            {passwordErrorMessage?.length > 0 && (
              <Text style={styles.textDanger}>{passwordErrorMessage}</Text>
            )}
            <View style={styles.action}>
              <View style={styles.passHeader}>
                <Text style={styles.inputHeader}>Confirm Your Password</Text>
              </View>
              <TextInput
                secureTextEntry={true}
                value={confirmPassword}
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={confirmPassword =>
                  setconfirmPassword(confirmPassword)
                }
              />
            </View>
            {confirmPasswordErrorMessage?.length > 0 && (
              <Text style={styles.textDanger}>
                {confirmPasswordErrorMessage}
              </Text>
            )}
          </View>
          <View>
            <TouchableOpacity style={styles.button} onPress={nextStep}>
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

export default CreatePasswordScreen;

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
  logo: {
    width: 166,
    height: 166,
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 30,
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
  scrollView: {
    width: '100%',
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
  signIn: {
    width: 237,
    height: 57,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
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
  headerWidthButton: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  textDanger: {
    color: 'red',
    fontSize: 12,
  },
});
