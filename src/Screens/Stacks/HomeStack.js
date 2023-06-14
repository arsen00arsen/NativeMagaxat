// import { useTranslation } from 'react-i18next';
import React from 'react';
import {Platform} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../MaintbScreens/HomeScreens/HomeScreen';

const Home = createStackNavigator();
const HomeStak = ({navigation}) => {
  const insets = useSafeAreaInsets();

  return (
    <Home.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerStatusBarHeight: insets.top,
      }}
      options={{
        headerShown: true,
      }}>
      <Home.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerTitle: '',
         //   headerLeft: _renderHeaderLeftIcon,
          headerStyle: {
            shadowColor: '#1E232C',
            shadowRadius: 4,
            backgroundColor: 'white',
            shadowOffset: {
              height: Platform.OS === 'ios' ? 0 : 20,
            },
          },
        }}
      />
    </Home.Navigator>
  );
};
export default HomeStak;
