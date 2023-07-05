import * as React from 'react';
import {Image, TouchableOpacity, View, StyleSheet} from 'react-native';
import HomeStak from '../../Stacks/HomeStack';
import GlobalStyles from '../../../Configs/GlobalStyles';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import PatronsStak from '../../Stacks/PatronsStak';
import FeandsStack from '../../Stacks/FeandsStack';
import ProfileStack from '../../Stacks/ProfileStack';
import PostStack from '../../Stacks/PostStack';

const Tab = createBottomTabNavigator();
const TabScreens = ({navigation}) => {
  const CustomTabBarButton = ({children}) => (
    <View style={styles.custopButtonStyles}>
      <TouchableOpacity onPress={() => navigation.navigate('PostStack')}>
        <View>{children}</View>
      </TouchableOpacity>
    </View>
  );
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,
          position: 'absolute',
          bottom: 0,
          height: 90,
        },
        tabBarActiveTintColor: '#100E34',
        tabBarInactiveTintColor: '#BFC8D2',
      }}>
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
        component={PatronsStak}
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
        name="PostStack"
        component={PostStack}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('../../../../assets/icons/Add.png')}
              resizeMode="cover"
              style={{
                height: 40,
                width: 40,
                tintColor: '#4F48EC',
              }}
            />
          ),
          tabBarButton: props => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="FeandsStack"
        component={FeandsStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={[GlobalStyles.justifyBetween]}>
              <Image
                source={require('../../../../assets/icons/Freands.png')}
                resizeMode="contain"
                style={{
                  height: 24,
                  borderRadius: 20,
                  tintColor: focused ? '#100E34' : '#BFC8D2',
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="My Profile"
        component={ProfileStack}
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

const styles = StyleSheet.create({
  custopButtonStyles: {
    top: -15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: 80,
    height: 80,
    borderRadius: 40,
  },
});
