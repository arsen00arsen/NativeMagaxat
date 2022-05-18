import React from 'react';
import {TouchableOpacity, StyleSheet, Text, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import IconSearch from 'react-native-vector-icons/Feather';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Feather';
import HomeScreen from '../navBarScreens/HomeScreens/HomeScreen';
import AccountScreen from './AccountScreens/AccountScreen';
import AccounProfiletScreen from './HomeScreens/AccounProfiletScreen';
import CommentScreen from '../navBarScreens/HomeScreens/CommentScreen';
import MediaScreen from './MediaScreens/MediaScreen';
import MediaSearch from './MediaScreens/MediaSearch';
import RowVideosScreen from './MediaScreens/RowVideosScreen';
import GridVediosScreen from './MediaScreens/GridVediosScreen';
import IconSec from 'react-native-vector-icons/FontAwesome5';
import BenefactorsScreen from './BenefactorsScreen/BenefactorsScreen';
import BenefactorUserPageScreen from './BenefactorsScreen/BenefactorUserPageScreen';
import BenefactorSearchPage from './BenefactorsScreen/BenefactorSearchPage';
import AccountsScreen from './AccountScreens/AccountsScreen';
import MyAccountScreen from './MyAccountScreens/MyAccountScreen';
import GeneralScreen from './MyAccountScreens/GeneralScreen';
import MyPostsScreen from './MyAccountScreens/MyPostsScreen';
import MyMediaScreen from './MyAccountScreens/MyMediaScreen';
import MySubscribtionsScreen from './MyAccountScreens/MySubscribtionsScreen';
import MySubscribersScreen from './MyAccountScreens/MySubscribersScreen';
import SettingsScreen from './MyAccountScreens/SettingsScreen';
import MesageScreen from './MesageScreen';
import Chat from './Chat';
import moment from 'moment';
import {View} from 'react-native-animatable';
const Tab = createMaterialBottomTabNavigator();
const MediaStack = createStackNavigator();
const HomePage = createStackNavigator();
const Ben = createStackNavigator();
const AccountStack = createStackNavigator();
const Mesage = createStackNavigator();
const Acts = createStackNavigator();
const MainTabScreen = () => {
  return (
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
        tabBarOptions={{style: {borderTopColor: '#ffffff', height: 5}}}
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
        component={Accounts}
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
};
export default MainTabScreen;

const MyAccountStackScreen = ({navigation}) => (
  <AccountStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <AccountStack.Screen name="MyAccountScreen" component={MyAccountScreen} />
    <AccountStack.Screen name="GeneralScreen" component={GeneralScreen} />
    <AccountStack.Screen name="MyPostsScreen" component={MyPostsScreen} />
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
    <HomePage.Screen name="MessageStack" component={MessageStack} />
    <HomePage.Screen name="CommentScreen" component={CommentScreen} />
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
    <MediaStack.Screen name="MediaSearch" component={MediaSearch} />
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
    <Ben.Screen name="BenefactorSearchPage" component={BenefactorSearchPage} />
  </Ben.Navigator>
);

const Accounts = ({navigation}) => (
  <Acts.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Acts.Screen name="AccountsScreen" component={AccountsScreen} />
    <Acts.Screen name="AccountScreen" component={AccountScreen} />
  </Acts.Navigator>
);

const MessageStack = ({navigation}) => (
  <Mesage.Navigator
    screenOptions={() => ({
      headerTitleAlign: 'center',
      title: (
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/logoHeader.png')}
            style={styles.logo}
          />
        </View>
      ),
      headerStyle: {backgroundColor: '#F2F2F2', elevation: 0},
      headerLeft: () => {
        return (
          <View style={styles.leftCont}>
            <LinearGradient
              style={styles.badgedIcon}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              locations={[0.0, 0.9]}
              colors={['#D1C7B9', '#D2C8B9']}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.goBack()}>
                <Icon name="chevron-left" size={24} color="black" />
              </TouchableOpacity>
            </LinearGradient>
          </View>
        );
      },
      headerRight: () => {
        return (
          <View style={styles.righttCont}>
            <LinearGradient
              style={styles.badgedIcon}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              locations={[0.0, 0.9]}
              colors={['#D1C7B9', '#D2C8B9']}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.goBack()}>
                <IconSearch name="search" size={24} color="black" />
              </TouchableOpacity>
            </LinearGradient>
          </View>
        );
      },
    })}>
    <Mesage.Screen name="Mesagees" component={MesageScreen} />
    <Mesage.Screen
      name="Chat"
      options={({route}) => ({
        title: (
          <View style={styles.chatTitle}>
            <Text style={styles.paramsName}>{route.params.name}</Text>
            <Text style={styles.status}>
              {moment(route.params.status).fromNow()}
            </Text>
          </View>
        ),
        headerBackTitleVisible: false,
      })}>
      {props => <Chat {...props} />}
    </Mesage.Screen>
  </Mesage.Navigator>
);

const styles = StyleSheet.create({
  badgedIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 47,
    height: 47,
    borderRadius: 5,
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  leftCont: {
    paddingLeft: 15,
    paddingTop: 10,
  },
  righttCont: {
    paddingRight: 15,
    paddingTop: 10,
  },
  logo: {
    width: 146,
  },
  logoContainer: {
    paddingTop: 10,
  },
  paramsName: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  chatTitle: {
    display: 'flex',
    flexDirection: 'column',
  },
});
