import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MediaScreen from './MediaScreen';
import MediaSearch from './MediaSearch';
import RowVideosScreen from './RowVideosScreen';
import GridVediosScreen from './GridVediosScreen';

const MediaStack = createStackNavigator();

const MediaPageScreen = () => (
  <MediaStack.Navigator
    name="Media"
    screenOptions={{
      headerShown: false,
    }}>
    <MediaStack.Screen name="MediaScreen" component={MediaScreen} />
    <MediaStack.Screen name="RowVideosScreen" component={RowVideosScreen} />
    <MediaStack.Screen name="GridVediosScreen" component={GridVediosScreen} />
    <MediaStack.Screen name="MediaSearch" component={MediaSearch} />
  </MediaStack.Navigator>
);

export default MediaPageScreen;
