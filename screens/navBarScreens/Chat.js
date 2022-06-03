import React, {useState, useEffect, useCallback, useRef} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  GiftedChat,
  Bubble,
  Send,
  InputToolbar,
  Actions,
} from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import {LogBox} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import ImageView from 'react-native-image-viewing';
import io from 'socket.io-client';
import {useNavigation} from '@react-navigation/native';
import {state} from 'react-native-push-notification/component';
import SocketIOClient from 'socket.io-client';
import {createSocketConnection} from '../../http/socketService/socketService';
// import Pusher from 'pusher-js/react-native';
import Echo from 'laravel-echo';
LogBox.ignoreLogs(['EventEmitter.removeListener']);

export default function ChatScreen({route, props}) {
  const [messages, setMessages] = useState([]);
  const receiverId = route.params;
  // const {usserId, message, usserImage, uid, userName} = route.params;
  const userMain = useSelector(state => state?.user);
  // const navigation = useNavigation();
  // console.log(route.params, 'route.paramsroute.params');
  // const ws = useRef(null);
  // useEffect(() => {
  //   console.log('initiateSocketConnection');
  //   // enter your websocket url
  //   ws.current = new WebSocket('ws://192.168.0.112:6001');
  //   ws.current.onopen = () => {
  //     console.log('connection establish open');
  //   };
  //   ws.current.onclose = () => {
  //     console.log('connection establish closed');
  //   };
  //   return () => {
  //     ws.current.close();
  //   };
  // }, []);

  useEffect(() => {
    connectWebSocketWatch();
    setMessages([
      {
        _id: userMain.id,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: receiverId.uid,
          name: receiverId.name,
        },
      },
    ]);
  }, []);
  // useEffect(() => {
  //   ws.current.onmessage = e => {
  //     const response = JSON.parse(e.data);
  //     console.log('onmessage=>', JSON.stringify(response));
  //     var sentMessages = {
  //       _id: userMain.id,
  //       text: response.message,
  //       createdAt: new Date(response.createdAt * 1000),
  //       user: {
  //         _id: receiverId.uid,
  //         name: receiverId.name,
  //       },
  //     };
  //     setMessages(previousMessages =>
  //       GiftedChat.append(previousMessages, sentMessages),
  //     );
  //   };
  // }, []);
  const onSend = useCallback((messages = []) => {
    // let obj = {
    //   senderId: userMain.id,
    //   receiverId: receiverId.uid,
    //   message: messages[0].text,
    //   action: 'message',
    // };
    // ws.current.send(JSON.stringify(obj));
    // setMessages(previousMessages =>
    //   GiftedChat.append(previousMessages, messages),
    // );
  }, []);

  const connectWebSocketWatch = () => {
    //put your backend serve url here
    // createSocketConnection();
    let echo = new Echo({
      // broadcaster: 'socket.io',
      // key: '123456', // hard code
      // // host: '192.168.0.124',
      // //http://192.168.0.124
      // // wssHost: 'ws://192.168.0.112:6001',
      // // enabledTransports: ['ws', 'wss'],
      // // wssPort: 6001,
      // client: io,
      // // forceTLS: true,
      // // disableStats: true,
      // broadcaster: 'pusher',
      cluster: 'mt1',
      disableStats: true,
      enabledTransports: Array.ws,
      encrypted: true,
      forceTLS: false,
      key: '123456',
      wsHost: '192.168.0.124',
      wsPort: '6001',
    });
    echo.private('notifications.10').listen('.notification', e => {
      console.log(e);
    });
    // const socket = io('192.168.0.124', {transports: ['websocket']});
    // console.log(socket, 'sssss');
    // console.log(SocketIOClient);
    //get_message_ = this is a provide by backend.
    // socket.on('notifications.10', data => {
    // console.log(data, 'ssssss');
    //   console.log(data, 'sssss');
    //   //   console.log(data);
    //   //   // var userMessageData = JSON.parse(data);
    //   //   // var chatDataArray = [...this.state.userChatList];
    //   //   // let message = [userMessageData];
    //   //   // let newChatArray = message.concat(chatDataArray);
    //   //   // this.setState({
    //   //   //   userChatList: newChatArray,
    //   //   //   chatMessage: '',
    //   //   // });
    // });
  };

  // const onSend = useCallback((messages = []) => {
  //   setMessages(previousMessages =>
  //     GiftedChat.append(previousMessages, messages),
  //   );
  // }, []);
  const renderSend = props => {
    return (
      <Send {...props}>
        <Icon
          name="send-circle"
          size={34}
          color="#A5A5A5"
          style={{marginBottom: 5, marginRight: 5}}
        />
      </Send>
    );
  };

  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#B9AA93',
            borderWidth: 1,
            borderColor: 'silver',
          },
        }}
        textStyle={{
          right: {
            color: 'black',
          },
        }}
      />
    );
  };
  const renderToolbar = props => {
    return <InputToolbar {...props} containerStyle={styles.inputToolbar} />;
  };
  return (
    <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
      <GiftedChat
        messages={messages}
        style={styles.canteiner}
        onSend={messages => onSend(messages)}
        user={{
          _id: userMain.id,
        }}
        renderAvatar={null}
        renderBubble={renderBubble}
        alwaysShowSend
        renderSend={renderSend}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
        renderInputToolbar={renderToolbar}
        underlineColorAndroid="white"
        textInputProps={{
          underlineColorAndroid: 'white',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  canteiner: {
    backgroundColor: '#ECECEC',
  },
  inputToolbar: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 2,
    borderRadius: 20,
    paddingTop: 3,
    backgroundColor: 'white',
    marginTop: -20,
  },
  photosend: {
    position: 'absolute',
    right: 50,
    bottom: 0,
    zIndex: 9999,
  },
  imgMsg: {
    width: 200,
    height: 200,
    padding: 6,
    borderRadius: 15,
    resizeMode: 'cover',
  },
});
