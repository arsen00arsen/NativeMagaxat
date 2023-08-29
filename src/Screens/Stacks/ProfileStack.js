import React from 'react';
import {Image, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import {useSelector} from 'react-redux';
import Button from '../../Elements/Button';
import Icon from '../../Elements/Icon';
import Text from '../../Elements/Text';
import MyProfileScreen from '../MaintbScreens/MyProfileScreens/MyProfileScreen';
import Language from '../MaintbScreens/MyProfileScreens/Language';
import MyPostsScreen from '../MaintbScreens/MyProfileScreens/MyPostsScreen';
import MyFollowersScreen from '../MaintbScreens/MyProfileScreens/MyFollowersScreen';
import MyFollowingsScreen from '../MaintbScreens/MyProfileScreens/MyFollowingsScreen';
import MyBioScreen from '../MaintbScreens/MyProfileScreens/MyBioScreen';


const Profile = createStackNavigator();

const ProfileStack = ({navigation, route}) => {
  const {t} = useTranslation();
  const {user} = useSelector(state => state.user);
  const _headerLeft = () => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Button
          onPress={() => navigation.navigate('MyProfileScreen')}
          isTransparent
          style={{borderWidth: 0}}
          icon={<Icon isPrimary name="chevron-left" size={25} />}
        />
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
          headerTitle: t('myProfile'),
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
          headerTitle: t('language_title'),
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
      <Profile.Screen
        name="MyPosts"
        component={MyPostsScreen}
        options={{
          headerTitle: t('my_account_posts'),
          headerRight: () => _headerRithChat(),
          headerLeft: () => _headerLeft(),
          headerLeftContainerStyle: {
            paddingLeft: 15,
          },
          headerRightContainerStyle: {
            paddingRight: 15,
          },
        }}
      />
      <Profile.Screen
        name="MyFollowings"
        component={MyFollowingsScreen}
        options={{
          headerTitle: t('my_account_folowers'),
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
      <Profile.Screen
        name="MyFollowers"
        component={MyFollowersScreen}
        options={{
          headerTitle: t('my_account_folower'),
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
      <Profile.Screen
        name="MyBio"
        component={MyBioScreen}
        options={{
          headerTitle: t('myBio'),
          headerRight: () => _headerRithChat(),
          headerLeft: () => _headerLeft(),
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
