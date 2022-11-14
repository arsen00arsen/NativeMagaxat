import React from 'react';
import {useDispatch} from 'react-redux';
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
import Icon from 'react-native-vector-icons/Feather';
import CustomInput from '../components/loginComponents/CustomInput';

const CreatePasswordScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {control, handleSubmit, watch} = useForm();
  let pwd = watch('password');
  const submitFormHandler = handleSubmit(data => {
    dispatch({type: 'FIRST_STEP_SUBMIT', payload: data});
    navigation.navigate('LocationPageScreen');
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
    // width: 166,
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
  textSign: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 21,
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
    marginBottom: 40,
  },
  headerWidthButton: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  nameInput: {
    marginBottom: 20,
  },
});
