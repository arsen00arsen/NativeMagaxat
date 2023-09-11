import React, {useEffect} from 'react';
import {WebView} from 'react-native-webview';

function SuportScreen({navigation}) {
  useEffect(() => {
    navigation
      .getParent()
      ?.setOptions({tabBarStyle: {display: 'none'}, tabBarVisible: false});

    return () => {
      // _sendIDsForRead();
      navigation
        .getParent()
        ?.setOptions({tabBarStyle: {height: 90}, tabBarVisible: undefined});
    };
  }, [navigation]);
  return (
    <WebView
      source={{
        uri: 'https://go.crisp.chat/chat/embed/?website_id=09c9aa99-bb29-4143-8cf1-5aee8009f79e&user_email=XXXXXXX&user_phone=XXXXXXX&user_nickname=XXXXXXX',
      }}
      style={{flex: 1}}
    />
  );
}
export default SuportScreen;
