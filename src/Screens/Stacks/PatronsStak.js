// import { useTranslation } from 'react-i18next';
import React from 'react';
import {Image, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import HomeScreen from '../MaintbScreens/HomeScreens/HomeScreen';
import Button from '../../Elements/Button';
import Icon from '../../Elements/Icon';
import Text from '../../Elements/Text';
import PatronScreen from '../MaintbScreens/PatronsScreen/PatronScreen';
import PatronsSinglePage from '../MaintbScreens/PatronsScreen/PatronsSinglePage';
import PatronsSearch from '../MaintbScreens/PatronsScreen/PatronsSearch';
import {useTranslation} from 'react-i18next';

const Patrons = createStackNavigator();
const PatronsStak = ({navigation}) => {
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();
  const {user} = useSelector(state => state.user);
  const _headerleft = () => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Button
          onPress={() => navigation.navigate('PatronScreen')}
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
    <Patrons.Navigator
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
          backgroundColor: 'white',
        },
      }}
      headerBackButtonMenuEnabled={true}
      options={{
        headerShown: true,
      }}>
      <Patrons.Screen
        name="PatronScreen"
        component={PatronScreen}
        options={{
          headerTitle: t('patron'),
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
      <Patrons.Screen
        name="PatronsSinglePage"
        component={PatronsSinglePage}
        options={{
          headerTitle: t('post'),
          headerLeft: () => _headerleft(),
          headerRight: () => _headeright(),
          headerLeftContainerStyle: {
            paddingLeft: 15,
          },
          headerRightContainerStyle: {
            paddingRight: 15,
          },
        }}
      />
      <Patrons.Screen
        name="PatronsSearch"
        component={PatronsSearch}
        options={{
          headerTitle: t('post_search'),
          headerLeft: () => _headerleft(),
          headerRight: () => _headeright(),
          headerLeftContainerStyle: {
            paddingLeft: 15,
          },
          headerRightContainerStyle: {
            paddingRight: 15,
          },
        }}
      />
    </Patrons.Navigator>
  );
};
export default PatronsStak;
