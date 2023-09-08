// import { useTranslation } from 'react-i18next';
import React, {useEffect, useState} from 'react';
import {Image, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';
import {useChannel, useEvent} from '@harelpls/use-pusher/react-native';
import HomeScreen from '../MaintbScreens/HomeScreens/HomeScreen';
import Button from '../../Elements/Button';
import Icon from '../../Elements/Icon';
import Text from '../../Elements/Text';
import ChatRoom from '../MaintbScreens/HomeScreens/ChatRoom';
import {ChatContent} from '../MaintbScreens/HomeScreens/ChatContent';
import CommentScreen from '../MaintbScreens/HomeScreens/CommentScreen';
import NotificationsScreen from '../MaintbScreens/HomeScreens/NotificationsScreen';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {logoutUser} from '../../../stores/user/userActions';
import {useIsFocused} from '@react-navigation/native';
import UserService from '../../http/Account/account';

const Home = createStackNavigator();
const HomeStak = ({navigation}) => {
  // const {user} = useSelector(state => state.user);
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [user, setUserInfos] = useState();
  const insets = useSafeAreaInsets();
  const [notif, setNotif] = useState(0);
  const isFocused = useIsFocused();
  const [messageCount, setmessageCount] = useState(0);
  useEffect(() => {
    if (isFocused) {
      userInfo();
    }
  }, [isFocused]);
  const userInfo = async () => {
    try {
      const {data} = await UserService.getMe();
      setUserInfos(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const channel = useChannel(`private-app.user.notification.${user?.id}`);
  useEvent(channel, 'new_notification', data => {
    setNotif(data.count);
  });

  const channel2 = useChannel(`private-message.${user?.id}`);
  useEvent(channel2, 'new_message', data => {
    setmessageCount(data.count_unread);
  });

  const _checkIfGuest = async screen => {
    const userAsGuest = await AsyncStorage.getItem('USER_GUEST_TOKEN');
    if (userAsGuest === 'AS_GUEST') {
      dispatch(logoutUser());
    } else {
      navigation.navigate(screen);
    }
  };
  const _headerLeft = () => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Button
          onPress={() => navigation.navigate('HomeScreen')}
          isTransparent
          style={{borderWidth: 0}}
          icon={<Icon isPrimary name="chevron-left" size={25} />}
        />
      </View>
    );
  };
  const _headerLeftChat = () => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Button
          onPress={() => navigation.navigate('ChatRoom')}
          isTransparent
          style={{borderWidth: 0}}
          icon={<Icon isPrimary name="chevron-left" size={25} />}
        />
      </View>
    );
  };
  const _headerleft = () => {
    return (
      <Image
        source={require('../../../assets/RootScreens/logoWhite.png')}
        style={{width: 90, height: 12, tintColor: '#ED7B12'}}
      />
    );
  };

  const _headeright = () => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Button
          isTransparent
          onPress={() => _checkIfGuest('Notifications')}
          style={{borderWidth: 0, marginHorizontal: 10}}
          icon={<Icon isPrimary name="bell-o" size={20} />}>
          <Text isPrimary style={{fontSize: 18, paddingHorizontal: 5}}>
            {user?.unread_notifications > 0 && notif === 0
              ? user?.unread_notifications
              : notif}
          </Text>
        </Button>
        <Button
          isTransparent
          onPress={() => _checkIfGuest('ChatRoom')}
          style={{borderWidth: 0}}
          icon={<Icon isPrimary useAntDesign name="message1" size={20} />}>
          <Text isPrimary style={{fontSize: 18, paddingHorizontal: 5}}>
            {user?.unread_messages > 0 && messageCount === 0
              ? user?.unread_messages
              : messageCount}
          </Text>
        </Button>
      </View>
    );
  };
  const _headerRithChat = () => {
    return (
      <Image
        source={{uri: user?.avatar}}
        style={{width: 30, height: 30, borderRadius: 15}}
      />
    );
  };

  return (
    <Home.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        hideWhenScrolling: true,
        headerTitleAlign: 'center',
        headerStatusBarHeight: insets.top,
        statusBarColor: 'dark',
        fullScreenGestureEnabled: true,
        customAnimationOnGesture: true,
        animation: 'slide_from_bottom',
        navigationBarHidden: true,
        headerStyle: {backgroundColor: 'white'},
        contentStyle: {backgroundColor: 'red'},
        cardStyle: {
          backgroundColor: 'white',
        },
      }}
      headerBackButtonMenuEnabled={true}
      options={{
        headerShown: true,
      }}>
      <Home.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerTitle: '',
          headerLeft: () => _headerleft(),
          headerRight: () => _headeright(),
          headerLeftContainerStyle: {
            paddingLeft: 15,
          },
          headerRightContainerStyle: {
            paddingRight: 15,
          },
        }}
      />
      <Home.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          headerTitle: t('notifications'),
          headerLeft: () => _headerLeft(),
          headerLeftContainerStyle: {
            paddingLeft: 15,
          },
          headerRightContainerStyle: {
            paddingRight: 15,
          },
        }}
      />
      <Home.Screen
        name="ChatRoom"
        component={ChatRoom}
        options={{
          headerTitle: '',
          headerLeft: () => _headerLeft(),
          headerRight: () => _headerRithChat(),
          headerLeftContainerStyle: {
            paddingLeft: 15,
          },
          headerRightContainerStyle: {
            paddingRight: 15,
          },
        }}
      />
      <Home.Screen
        name="ChatContent"
        component={ChatContent}
        options={{
          headerLeft: () => _headerLeftChat(),
          headerLeftContainerStyle: {
            paddingLeft: 15,
          },
          headerRightContainerStyle: {
            paddingRight: 15,
          },
        }}
      />
      <Home.Screen
        name="CommentScreen"
        component={CommentScreen}
        options={{
          headerTitle: t('comment'),
          headerLeft: () => _headerLeft(),
          headerRight: () => _headerRithChat(),
          headerLeftContainerStyle: {
            paddingLeft: 15,
          },
          headerRightContainerStyle: {
            paddingRight: 15,
          },
        }}
        listeners={{
          tabPress: e => _checkIfGuest('CommentScreen'),
        }}
      />
    </Home.Navigator>
  );
};
export default HomeStak;
