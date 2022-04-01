import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';

const SignInScreen = ({navigation}) => {
  const [data, setData] = React.useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const textInputChange = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handleValidUser = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
      });
    }
  };
  // const loginHandle = (userName, password) => {

  //     const foundUser = Users.filter( item => {
  //         return userName == item.username && password == item.password;
  //     } );

  //     if ( data.username.length == 0 || data.password.length == 0 ) {
  //         Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
  //             {text: 'Okay'}
  //         ]);
  //         return;
  //     }

  //     if ( foundUser.length == 0 ) {
  //         Alert.alert('Invalid User!', 'Username or password is incorrect.', [
  //             {text: 'Okay'}
  //         ]);
  //         return;
  //     }
  //     signIn(foundUser);
  // }
  const loginHandle = () => {
    console.log('Sign IN');
  };

  const handlePasswordChange = val => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  return (
    <LinearGradient
      start={{x: 1, y: 1}}
      end={{x: 1, y: 0}}
      colors={['#D6AB6F', '#B8B8B8', '#674C31']}
      style={styles.linearGradient}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.content}>
        <Text style={styles.text}>Log In</Text>
        <Animatable.Image
          animation="fadeInUpBig"
          duraton="1500"
          source={require('../assets/welcome.png')}
          style={styles.logo}
          resizeMode="stretch"
        />
        <View>
          <View style={styles.action}>
            <View>
              <Text style={styles.inputHeader}>Email</Text>
              <TextInput
                // placeholder="Your Email"
                placeholderTextColor="#666666"
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={val => textInputChange(val)}
                onEndEditing={e => handleValidUser(e.nativeEvent.text)}
              />
            </View>
          </View>
          <View style={styles.action}>
            <View style={styles.passHeader}>
              <Text style={styles.inputHeader}>Password</Text>
              <TouchableOpacity onPress={updateSecureTextEntry}>
                {data.secureTextEntry ? (
                  <Feather
                    style={styles.eyeIcon}
                    name="eye-off"
                    color="grey"
                    size={20}
                  />
                ) : (
                  <Feather
                    style={styles.eyeIcon}
                    name="eye"
                    color="grey"
                    size={20}
                  />
                )}
              </TouchableOpacity>
            </View>
            <TextInput
              // placeholder="Your Password"
              placeholderTextColor="#666666"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => handlePasswordChange(val)}
            />
            {/* {data.isValidPassword ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
                        </Animatable.View>
                    } */}
          </View>
        </View>
        <View>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => {
              loginHandle();
            }}>
            <LinearGradient
              colors={['#88673A', '#3C3835']}
              style={styles.signIn}>
              <Text style={styles.textSign}>Sign In</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('SignUpScreen')}>
            <Text style={styles.textSign}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
  },
  scrollView: {
    width: '100%',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '70%',
  },
  logo: {
    width: '100%',
    height: 57,
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
    justifyContent: 'center',
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
    height: 160,
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
    height: 28,
  },
});
