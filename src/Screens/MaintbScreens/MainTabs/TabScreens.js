import * as React from 'react';
import {Image, TouchableOpacity, View, StyleSheet} from 'react-native';
import HomeStak from '../../Stacks/HomeStack';
import GlobalStyles from '../../../Configs/GlobalStyles';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import PatronsStak from '../../Stacks/PatronsStak';
import FeandsStack from '../../Stacks/FeandsStack';
import ProfileStack from '../../Stacks/ProfileStack';
import PostStack from '../../Stacks/PostStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {logoutUser} from '../../../../stores/user/userActions';

const Tab = createBottomTabNavigator();
const TabScreens = ({navigation}) => {
  const dispatch = useDispatch();

  const _checkIfGuest = async ({stack, screen}) => {
    const userAsGuest = await AsyncStorage.getItem('USER_GUEST_TOKEN');
    if (userAsGuest === 'AS_GUEST') {
      dispatch(logoutUser());
    } else {
      navigation.navigate(stack, {screen: screen});
    }
  };
  const CustomTabBarButton = ({children}) => (
    <View style={styles.custopButtonStyles}>
      <TouchableOpacity
        onPress={() => _checkIfGuest({stack: 'PostStack', screen: 'AddPost'})}>
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
                marginTop: 13,
                height: 40,
                width: 40,
                tintColor: '#4F48EC',
              }}
            />
          ),
          tabBarLabel: '',
          tabBarButton: props => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Profiles"
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
        listeners={{
          tabPress: e =>
            _checkIfGuest({stack: 'Profiles', screen: 'FreandScreen'}),
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
    borderWidth: 0.3,
    borderColor: 'silver',
  },
});
