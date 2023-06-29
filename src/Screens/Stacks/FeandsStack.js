// import { useTranslation } from 'react-i18next';
import React from 'react';
import {Image, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../MaintbScreens/HomeScreens/HomeScreen';
import Button from '../../Elements/Button';
import Icon from '../../Elements/Icon';
import Text from '../../Elements/Text';
import PatronScreen from '../MaintbScreens/PatronsScreen/PatronScreen';
import PatronsSinglePage from '../MaintbScreens/PatronsScreen/PatronsSinglePage';
import FreandScreen from '../MaintbScreens/FreandsScreens/FreandScreen';
import FreandsSingleScreen from '../MaintbScreens/FreandsScreens/FreandsSingleScreen';

const Freands = createStackNavigator();
const FeandsStack = ({navigation, route}) => {
  const insets = useSafeAreaInsets();

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
      <Image
        source={require('../../../assets/fakeImages/png1.png')}
        style={{width: 30, height: 30, borderRadius: 15}}
      />
    );
  };

  return (
    <Freands.Navigator
      initialRouteName="PatronScreen"
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
      <Freands.Screen
        name="FreandScreen"
        component={FreandScreen}
        options={{
          headerTitle: 'Freands',
          // headerLeft: () => _headerleft(),
          headerRight: () => _headeright(),
          headerLeftContainerStyle: {
            paddingLeft: 15,
          },
          headerRightContainerStyle: {
            paddingRight: 15,
          },
        }}
      />
      <Freands.Screen
        name="FreandsSingleScreen"
        component={FreandsSingleScreen}
        options={{
          headerTitle: 'Friends Single Page',
          // headerLeft: () => _headerleft(),
          headerRight: () => _headeright(),
          headerLeftContainerStyle: {
            paddingLeft: 15,
          },
          headerRightContainerStyle: {
            paddingRight: 15,
          },
        }}
      />
    </Freands.Navigator>
  );
};
export default FeandsStack;
