import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BenefactorsScreen from './BenefactorsScreen';
import BenefactorUserPageScreen from './BenefactorUserPageScreen';
import BenefactorSearchPage from './BenefactorSearchPage';

const Ben = createStackNavigator();

const BensScreens = ({navigation}) => (
  <Ben.Navigator
    name="Benefactors"
    screenOptions={{
      headerShown: false,
    }}>
    <Ben.Screen name="BenefactorsScreen" component={BenefactorsScreen} />
    <Ben.Screen
      name="BenefactorUserPageScreen"
      component={BenefactorUserPageScreen}
    />
    {/* <Ben.Screen name="BenefactorSearchPage" component={BenefactorSearchPage} /> */}
  </Ben.Navigator>
);

export default BensScreens;
