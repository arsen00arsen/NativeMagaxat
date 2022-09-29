/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {requestUserPermission} from './utils/pushNotification';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import {ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getMe} from './stores/user/userActions';
import {AuthContainer} from './containers/AuthContainer';
import PushNotification from 'react-native-push-notification';

const App = () => {
  const dispatch = useDispatch();
  const {loading, isAuth, user} = useSelector(state => state.user);
  useEffect(() => {
    dispatch(getMe());
    requestUserPermission;
    createChanels();
  }, []);

  const createChanels = async () => {
    PushNotification.createChannel({
      channelId: 'test',
      channelName: 'Test Channel',
    });
  };
  if (loading) {
    return (
      <LinearGradient
        start={{x: 1, y: 1}}
        end={{x: 1, y: 0}}
        colors={['#cbb085', '#B8B8B8', '#cbb085']}
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Animatable.Image
          animation="fadeInUpBig"
          duraton="1500"
          source={require('./assets/logo.png')}
          style={{width: 237, height: 57, marginBottom: 100}}
          resizeMode="stretch"
        />
        <ActivityIndicator size="large" color="white" />
      </LinearGradient>
    );
  }

  return <AuthContainer isAuth={isAuth} userId={user?.id} />;
};

export default App;
