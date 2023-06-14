import * as React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import PatronScreen from '../PatronsScreen/PatronScreen';
import FreandScreen from '../FreandsScreens/FreandScreen';
import MyProfileScreen from '../MyProfileScreens/MyProfileScreen';
import HomeStak from '../../Stacks/HomeStack';
import GlobalStyles from '../../../Configs/GlobalStyles';
import {Image, TouchableOpacity, View} from 'react-native';
import AddPost from '../AddPost/AddPost';
const Tab = createMaterialBottomTabNavigator();

const TabScreens = () => {
  return (
    <Tab.Navigator
      barStyle={
        {
          // position: 'absolute',
          // backgroundColor: 'red',
        }
      }>
      <Tab.Screen
        name="Home"
        component={HomeStak}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={[GlobalStyles.justifyBetween]}>
              <Image
                source={require('../../../../assets/icons/Home.png')}
                resizeMode="contain"
                style={{
                  height: 24,
                  tintColor: focused ? '#100E34' : '#BFC8D2',
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Patrons"
        component={PatronScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={[GlobalStyles.justifyBetween]}>
              <Image
                source={require('../../../../assets/icons/Patreon.png')}
                resizeMode="contain"
                style={{
                  height: 24,
                  tintColor: focused ? '#100E34' : '#BFC8D2',
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name=" "
        component={AddPost}
        options={{
          tabBarIcon: ({focused}) => (
            <TouchableOpacity
              style={{
                // top: -50,
                position: 'relative',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 5,
              }}>
              {/* <View style={[GlobalStyles.justifyBetween]}> */}
              <Image
                source={require('../../../../assets/icons/Add.png')}
                resizeMode="contain"
                style={{
                  // position: 'absolute',
                  top: -50,
                  zIndex: 5,
                  height: 40,
                  tintColor: focused ? '#100E34' : '#BFC8D2',
                }}
              />
              {/* </View> */}
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Freands"
        component={FreandScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={[GlobalStyles.justifyBetween]}>
              <Image
                source={require('../../../../assets/icons/Freands.png')}
                resizeMode="contain"
                style={{
                  height: 24,
                  tintColor: focused ? '#100E34' : '#BFC8D2',
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="My Profile"
        component={MyProfileScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={[GlobalStyles.justifyBetween]}>
              <Image
                source={require('../../../../assets/icons/Account.png')}
                resizeMode="contain"
                style={{
                  height: 24,
                  tintColor: focused ? '#100E34' : '#BFC8D2',
                }}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default TabScreens;
