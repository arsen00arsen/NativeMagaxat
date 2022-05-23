import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AccountsScreen from './AccountsScreen';
import AccountScreen from './AccountScreen';
const Acts = createStackNavigator();

const Accounts = ({navigation}) => (
  <Acts.Navigator
    name="Accounts"
    screenOptions={{
      headerShown: false,
    }}>
    <Acts.Screen name="AccountsScreen" component={AccountsScreen} />
    <Acts.Screen name="AccountScreen" component={AccountScreen} />
  </Acts.Navigator>
);
export default Accounts;
