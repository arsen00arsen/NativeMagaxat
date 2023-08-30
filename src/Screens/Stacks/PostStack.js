import React from 'react';
import {Image} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import AddPost from '../MaintbScreens/AddPost/AddPost';
import AddedPost from '../MaintbScreens/AddPost/AddedPost';

const Post = createStackNavigator();
const PostStack = () => {
  const {t} = useTranslation();
  const {user} = useSelector(state => state.user);
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
        source={{uri: user.avatar}}
        style={{width: 30, height: 30, borderRadius: 15}}
      />
    );
  };

  return (
    <Post.Navigator
      initialRouteName="AddPost"
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
      <Post.Screen
        name="AddPost"
        component={AddPost}
        options={{
          headerTitle: t('create_post'),
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
      <Post.Screen
        name="AddedPost"
        component={AddedPost}
        options={{
          headerTitle: t('post_added'),
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
    </Post.Navigator>
  );
};
export default PostStack;
