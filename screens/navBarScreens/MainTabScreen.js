import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {TouchableOpacity, StyleSheet, Image, Platform} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import IconSearch from 'react-native-vector-icons/Feather';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Feather';
import HomeScreen from '../navBarScreens/HomeScreens/HomeScreen';
import Accounts from './AccountScreens/Accounts';
import PostSearch from './HomeScreens/PostSearch';
import BensScreens from './BenefactorsScreen/BensScreens';
import AccounProfiletScreen from './HomeScreens/AccounProfiletScreen';
import CommentScreen from '../navBarScreens/HomeScreens/CommentScreen';
import MediaPageScreen from './MediaScreens/MediaPageScreen';
import MyAccountStackScreen from './MyAccountScreens/MyAccountStackScreen';
import IconSec from 'react-native-vector-icons/FontAwesome5';
import MesageScreen from './MesageScreen';
import {View} from 'react-native-animatable';
import Status from './HomeScreens/Status';
const Tab = createMaterialBottomTabNavigator();
const HomePage = createStackNavigator();
const Mesage = createStackNavigator();

const MainTabScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="Homes"
      activeColor="#A48A66"
      barStyle={{
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: 0,
      }}
      shifting={false}
      inactiveColor="#ffffff">
      <Tab.Screen
        name="Home"
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
        name="Appeals"
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

const HomeScreens = ({navigation}) => (
  <HomePage.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <HomePage.Screen name="HomeScreen" component={HomeScreen} />
    <HomePage.Screen name="Status" component={Status} />
    <HomePage.Screen
      name="AccounProfiletScreen"
      component={AccounProfiletScreen}
    />
    <HomePage.Screen name="PostSearch" component={PostSearch} />
    <HomePage.Screen name="MessageStack" component={MessageStack} />
    <HomePage.Screen name="CommentScreen" component={CommentScreen} />
    <HomePage.Screen name="MesageScreen" component={MesageScreen} />
  </HomePage.Navigator>
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
      headerStyle: {
        backgroundColor: '#F2F2F2',
        elevation: 0,
        shadowColor: Platform.OS === 'ios' ? 'transparent' : 'unset',
      },
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
    })}>
    <Mesage.Screen name="Mesagees" component={MesageScreen} />
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
    height: 37,
    width: 146,
  },
  logoContainer: {
    paddingTop: 10,
  },
});
