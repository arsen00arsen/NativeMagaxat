import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AccountsScreen from './AccountsScreen';
import AccountScreen from './AccountScreen';
import AccountUsers from './AccountUsers';
import AccountBenefactors from './AccountBenefactors';
const Acts = createStackNavigator();

const Accounts = ({navigation}) => (
  <Acts.Navigator
    name="Accounts"
    screenOptions={{
      headerShown: false,
    }}>
    <Acts.Screen name="AccountsScreen" component={AccountsScreen} />
    <Acts.Screen name="AccountUsers" component={AccountUsers} />
    <Acts.Screen name="AccountBenefactors" component={AccountBenefactors} />
    <Acts.Screen name="AccountScreen" component={AccountScreen} />
  </Acts.Navigator>
);
export default Accounts;
