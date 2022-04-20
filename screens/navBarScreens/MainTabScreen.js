import React from 'react';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import HeaderChatSearch from "../../components/HeaderChatSearch"
import HomeScreen from '../navBarScreens/HomeScreens/HomeScreen';
import AccounProfiletScreen from './HomeScreens/AccounProfiletScreen';
import MediaScreen from './MediaScreens/MediaScreen';
import RowVideosScreen from './MediaScreens/RowVideosScreen';
import GridVediosScreen from './MediaScreens/GridVediosScreen';
import IconSec from 'react-native-vector-icons/FontAwesome5';
import BenefactorsScreen from './BenefactorsScreen/BenefactorsScreen';
import BenefactorUserPageScreen from './BenefactorsScreen/BenefactorUserPageScreen';
import AccountsScreen from './AccountScreens/AccountsScreen';
import MyAccountScreen from './MyAccountScreens/MyAccountScreen';
import GeneralScreen from './MyAccountScreens/GeneralScreen';
// import MyPostsScreen from '../MyAccountScreens/MyPostsScreen';;
// import MyMediaScreen from '../MyAccountScreens/MyMediaScreen';;
// import MySubscribtionsScreen from '../MyAccountScreens/MySubscribtionsScreen';;
// import MySubscribersScreen from '../MyAccountScreens/MySubscribersScreen';;
// import SettingsScreen from '../MyAccountScreens/SettingsScreen';;
//  import MyPostsScreen from "../MyAccountScreens/MyPostsScreen"

const Tab = createMaterialBottomTabNavigator();
const MediaStack = createStackNavigator();
const HomePage = createStackNavigator();
const Ben = createStackNavigator();
const AccountStack = createStackNavigator();

const MainTabScreen = () => (
  <Tab.Navigator
    initialRouteName="Home"
    activeColor="#A48A66"
    barStyle={{backgroundColor: '#C6B7A2'}}
    inactiveColor="#ffffff">
    <Tab.Screen
      name="Homes"
      component={HomeScreens}
      options={{
        tabBarColor: '#C6B7A2',
        tabBarIcon: ({color}) => (
          <MaterialIcons name="home" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Media"
      component={MediaPageScreen}
      options={{
        tabBarColor: '#C6B7A2',
        tabBarIcon: ({color}) => (
          <MaterialIcons name="perm-media" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Benefactors"
      component={BensScreens}
      options={{
        tabBarColor: '#C6B7A2',
        tabBarIcon: ({color}) => (
          <IconSec name="hand-holding-usd" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Accounts"
      component={AccountsScreen}
      options={{
        tabBarLabel: 'Accounts',
        tabBarColor: '#C6B7A2',
        tabBarIcon: ({color}) => (
          <MaterialCommunityIcons
            name="account-group"
            color={color}
            size={26}
          />
        ),
      }}
    />
    <Tab.Screen
      name="My account"
      component={MyAccountStackScreen}
      options={{
        tabBarLabel: 'My account',
        tabBarColor: '#C6B7A2',
        tabBarIcon: ({color}) => (
          <MaterialCommunityIcons
            name="account-circle"
            size={25}
            color={color}
          />
        ),
      }}
    />
  </Tab.Navigator>
);
export default MainTabScreen;

const MyAccountStackScreen = ({navigation}) => (
  <AccountStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <AccountStack.Screen name="MyAccountScreen" component={MyAccountScreen} />
    <AccountStack.Screen name="GeneralScreen" component={GeneralScreen} />
    {/* <AccountStack.Screen name="MyPostsScreen" component={MyPostsScreen} />
    <AccountStack.Screen name="MyMediaScreen" component={MyMediaScreen} />
    <AccountStack.Screen
      name="MySubscribtionsScreen"
      component={MySubscribtionsScreen}
    />
    <AccountStack.Screen
      name="MySubscribersScreen"
      component={MySubscribersScreen}
    />
    <AccountStack.Screen name="SettingsScreen" component={SettingsScreen} /> */}
  </AccountStack.Navigator>
);
const HomeScreens = ({navigation}) => (
  <HomePage.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <HomePage.Screen name="HomeScreen" component={HomeScreen} />
    <HomePage.Screen
      name="AccounProfiletScreen"
      component={AccounProfiletScreen}
    />
  </HomePage.Navigator>
);

const MediaPageScreen = ({navigation}) => (
  <MediaStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <MediaStack.Screen name="MediaScreen" component={MediaScreen} />
    <MediaStack.Screen name="RowVideosScreen" component={RowVideosScreen} />
    <MediaStack.Screen name="GridVediosScreen" component={GridVediosScreen} />
  </MediaStack.Navigator>
);

const BensScreens = ({navigation}) => (
  <Ben.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Ben.Screen name="BenefactorsScreen" component={BenefactorsScreen} />
    <Ben.Screen
      name="BenefactorUserPageScreen"
      component={BenefactorUserPageScreen}
    />
  </Ben.Navigator>
);
