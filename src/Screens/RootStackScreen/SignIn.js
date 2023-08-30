import React from 'react';
import {
  View,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  Pressable,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {Controller, useForm} from 'react-hook-form';
import SafeAreaViewContainer from '../../Elements/SafeAreaViewContainer';
import GlobalStyles from '../../Configs/GlobalStyles';
import Text from '../../Elements/Text';
import Button from '../../Elements/Button';
import TextField from '../../Elements/TextField';
import {ScrollView} from 'react-native-gesture-handler';
import UserService from '../../http/Account/account';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loginUser} from '../../../stores/user/userActions';
import {useTranslation} from 'react-i18next';

const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const SignIn = ({navigation}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {control, handleSubmit} = useForm({});
  const firsInputs = [
    {
      name: 'email',
      control: control,
      placeholder: t('email'),
      title: 'Your Email Address*',
      rules: {
        required: t('inValidEmail'),
        pattern: {
          value: EMAIL_REGEX,
          message: t('inValidEmail'),
        },
      },
    },
  ];

  const submitFormHandler = handleSubmit(async sendingData => {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    sendingData.device_name = fcmToken;
    dispatch(loginUser(sendingData));
  });

  return (
    <View style={styles.container}>
      <SafeAreaViewContainer>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <ScrollView>
            <View
              style={[
                GlobalStyles.main__container,
                {
                  justifyContent: 'space-between',
                },
              ]}>
              <Text isHeadingTitle isCenter style={{color: '#ED7B12'}} isBold>
                {t('xelcomTo')}
              </Text>
              <View style={{marginTop: 60}}>
                <Text style={styles.title}>{t('log_in_account')}</Text>
                {firsInputs.map((elem, index) => {
                  return (
                    <Controller
                      key={index}
                      control={elem.control}
                      name={elem.name}
                      secureTextEntry={false}
                      rules={elem.rules}
                      render={({
                        field: {value, onChange, onBlur},
                        fieldState: {error: _error},
                      }) => (
                        <View>
                          <TextField
                            style={[
                              {
                                backgroundColor: '#fff',
                                borderWidth: 1,
                                borderColor: '#98A2B3',
                              },
                            ]}
                            hasMargin
                            placeholder={elem.placeholder}
                            secureTextEntry={false}
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                          />
                          {_error?.message && (
                            <Text style={{color: 'red'}}>
                              {_error?.message}
                            </Text>
                          )}
                        </View>
                      )}
                    />
                  );
                })}
                <Controller
                  control={control}
                  name={'password'}
                  secureTextEntry={false}
                  rules={{
                    required: t('inputRequired'),
                    minLength: {
                      value: 6,
                      message: t('passwordLenght'),
                    },
                  }}
                  render={({
                    field: {value, onChange, onBlur},
                    fieldState: {error: _error},
                  }) => (
                    <View>
                      <TextField
                        style={[
                          {
                            backgroundColor: '#fff',
                            borderWidth: 1,
                            borderColor: '#98A2B3',
                          },
                        ]}
                        hasMargin
                        placeholder={t('password')}
                        secureTextEntry={true}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                      />
                      {_error?.message && (
                        <Text style={{color: 'red'}}>{_error?.message}</Text>
                      )}
                    </View>
                  )}
                />
              </View>
              <Button
                style={{marginTop: 30, marginBottom: 10}}
                onPress={submitFormHandler}>
                <Text isWhite isBold>
                  {t('signIn')}
                </Text>
              </Button>
            </View>
            <View
              style={[
                GlobalStyles.main__container,
                {
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                },
              ]}>
              <Text style={styles.title}>{t('dont_have_account')} </Text>
              <Pressable onPress={() => navigation.navigate('Registration')}>
                <Text style={[styles.title, {color: '#4F48EC'}]}>
                  {t('registracion')}
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaViewContainer>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
  },
});
