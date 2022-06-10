import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyAccountScreen from './MyAccountScreen';
import GeneralScreen from './GeneralScreen';
import MyPostsScreen from './MyPostsScreen';
import MyMediaScreen from './MyMediaScreen';
import MySubscribtionsScreen from './MySubscribtionsScreen';
import MySubscribersScreen from './MySubscribersScreen';
import SettingsScreen from './SettingsScreen';
import MyPageUsersAccount from './MyPageUsersAccount';
const AccountStack = createStackNavigator();

const MyAccountStackScreen = ({navigation}) => (
  <AccountStack.Navigator
    name="My account"
    screenOptions={{
      headerShown: false,
    }}>
    <AccountStack.Screen name="MyAccountScreen" component={MyAccountScreen} />
    <AccountStack.Screen name="GeneralScreen" component={GeneralScreen} />
    <AccountStack.Screen name="MyPostsScreen" component={MyPostsScreen} />
    <AccountStack.Screen
      name="MyPageUsersAccount"
      component={MyPageUsersAccount}
    />
    <AccountStack.Screen name="MyMediaScreen" component={MyMediaScreen} />
    <AccountStack.Screen
      name="MySubscribtionsScreen"
      component={MySubscribtionsScreen}
    />
    <AccountStack.Screen
      name="MySubscribersScreen"
      component={MySubscribersScreen}
    />
    <AccountStack.Screen name="SettingsScreen" component={SettingsScreen} />
  </AccountStack.Navigator>
);

export default MyAccountStackScreen;
