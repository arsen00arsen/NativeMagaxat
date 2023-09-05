// import { useTranslation } from 'react-i18next';
import React, {useState} from 'react';
import {Image, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../MaintbScreens/HomeScreens/HomeScreen';
import Button from '../../Elements/Button';
import {useChannel, useEvent} from '@harelpls/use-pusher/react-native';
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

const Home = createStackNavigator();
const HomeStak = ({navigation}) => {
  const {user} = useSelector(state => state.user);
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const [notif, setNotif] = useState(0);
  const channel = useChannel(`private-app.user.notification.${user?.id}`);
  useEvent(channel, 'new_notification', data => {
    setNotif(data.count);
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
          style={{borderWidth: 0}}
          icon={<Icon isPrimary name="bell-o" size={20} />}
        />
        <Text isPrimary style={{fontSize: 18, paddingHorizontal: 5}}>
          {user?.unread_notifications > 0 && notif === 0
            ? user?.unread_notifications
            : notif}
        </Text>
        {/* <Button
          isTransparent
          onPress={() => _checkIfGuest('ChatRoom')}
          style={{borderWidth: 0}}
          icon={<Icon isPrimary useAntDesign name="message1" size={20} />}
        />
        <Text isPrimary style={{fontSize: 18, paddingHorizontal: 5}}>
          7
        </Text> */}
      </View>
    );
  };
  const _headerRithChat = () => {
    return (
      <Image
        source={require('../../../assets/fakeImages/png1.png')}
        style={{width: 30, height: 30, borderRadius: 15}}
      />
    );
  };
  const goBacks = () => {
    <Button
      isTransparent
      onPress={() => navigation.goBack()}
      style={{borderWidth: 0}}
      icon={<Icon isPrimary useAntDesign name="message1" size={20} />}
    />;
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
          // headerRight: () => _headeright(),
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
          headerTitle: 'Chats',
          // headerLeft: ,
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
          headerTitle: 'Chat',
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
