import React from 'react';
import {Image, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import Button from '../../Elements/Button';
import Icon from '../../Elements/Icon';
import FreandScreen from '../MaintbScreens/FreandsScreens/FreandScreen';
import FreandsSingleScreen from '../MaintbScreens/FreandsScreens/FreandsSingleScreen';
import FreandSearchScreen from '../MaintbScreens/FreandsScreens/FreandSearchScreen';

const Freands = createStackNavigator();
const FeandsStack = ({navigation, route}) => {
  const insets = useSafeAreaInsets();
  const {t} = useTranslation();
  const {user} = useSelector(state => state.user);
  const _headerLeft = () => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Button
          onPress={() => navigation.navigate('FreandScreen')}
          isTransparent
          style={{borderWidth: 0}}
          icon={<Icon isPrimary name="chevron-left" size={25} />}
        />
      </View>
    );
  };
  const _headeright = () => {
    return (
      <Image
        source={{uri: user.avatar}}
        style={{width: 30, height: 30, borderRadius: 15}}
      />
    );
  };

  return (
    <Freands.Navigator
      initialRouteName="FreandScreen"
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
          backgroundColor: 'white',
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
          headerTitle: t('users'),
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
          headerTitle: '',
          headerLeft: () => _headerLeft(),
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
        name="FreandSearch"
        component={FreandSearchScreen}
        options={{
          headerTitle: '',
          headerLeft: () => _headerLeft(),
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
