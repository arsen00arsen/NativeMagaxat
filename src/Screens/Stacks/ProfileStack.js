import React from 'react';
import {Image, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Button from '../../Elements/Button';
import Icon from '../../Elements/Icon';
import Text from '../../Elements/Text';
import MyProfileScreen from '../MaintbScreens/MyProfileScreens/MyProfileScreen';
import Language from '../MaintbScreens/MyProfileScreens/Language';
import MyPostsScreen from '../MaintbScreens/MyProfileScreens/MyPostsScreen';

const Profile = createStackNavigator();

const ProfileStack = ({navigation, route}) => {
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
  return (
    <Profile.Navigator
      initialRouteName="MyProfileScreen"
      screenOptions={{
        hideWhenScrolling: true,
        headerTitleAlign: 'center',
        // headerStatusBarHeight: insets.top,
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
      <Profile.Screen
        name="MyProfileScreen"
        component={MyProfileScreen}
        options={{
          headerTitle: 'My Profile',
          // headerRight: () => _headeright(),
          headerLeftContainerStyle: {
            paddingLeft: 15,
          },
          headerRightContainerStyle: {
            paddingRight: 15,
          },
        }}
      />
      <Profile.Screen
        name="Language"
        component={Language}
        options={{
          headerTitle: 'Language',
          headerRight: () => _headerRithChat(),
          headerLeftContainerStyle: {
            paddingLeft: 15,
          },
          headerRightContainerStyle: {
            paddingRight: 15,
          },
        }}
      />
      <Profile.Screen
        name="MyPosts"
        component={MyPostsScreen}
        options={{
          headerTitle: 'My Posts',
          headerRight: () => _headerRithChat(),
          headerLeftContainerStyle: {
            paddingLeft: 15,
          },
          headerRightContainerStyle: {
            paddingRight: 15,
          },
        }}
      />
    </Profile.Navigator>
  );
};
export default ProfileStack;
