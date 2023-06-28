// import { useTranslation } from 'react-i18next';
import React from 'react';
import {Image, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import HomeScreen from '../MaintbScreens/HomeScreens/HomeScreen';
import Button from '../../Elements/Button';
import Icon from '../../Elements/Icon';
import Text from '../../Elements/Text';
import ChatRoom from '../MaintbScreens/HomeScreens/ChatRoom';
import {ChatContent} from '../MaintbScreens/HomeScreens/ChatContent';

const Home = createStackNavigator();
const HomeStak = ({navigation, route}) => {
  const insets = useSafeAreaInsets();
  if (route.state && route.state.index > 0) {
    navigation.setOptions({tabBarVisible: false});
  } else {
    navigation.setOptions({tabBarVisible: false});
  }
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
          style={{borderWidth: 0}}
          icon={<Icon isPrimary name="bell-o" size={20} />}
        />
        <Text isPrimary style={{fontSize: 18, paddingHorizontal: 5}}>
          4
        </Text>
        <Button
          isTransparent
          onPress={() => navigation.navigate('ChatRoom')}
          style={{borderWidth: 0}}
          icon={<Icon isPrimary useAntDesign name="message1" size={20} />}
        />
        <Text isPrimary style={{fontSize: 18, paddingHorizontal: 5}}>
          7
        </Text>
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
  // const goBacks = () => {
  //   <Button
  //     isTransparent
  //     onPress={() => navigation.goBack()}
  //     style={{borderWidth: 0}}
  //     icon={<Icon isPrimary useAntDesign name="message1" size={20} />}
  //   />;
  // };
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
          backgroundColor: '#B8B8B8',
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
    </Home.Navigator>
  );
};
export default HomeStak;
