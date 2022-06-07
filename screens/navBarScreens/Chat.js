import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';
import {GiftedChat, Bubble, Send, InputToolbar} from 'react-native-gifted-chat';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {LogBox} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import ImageView from 'react-native-image-viewing';
import {useNavigation} from '@react-navigation/native';
import {loadMessages} from '../../stores/messages/messageActions';
import {MessageService} from '../../http/messageService/messageService';

LogBox.ignoreLogs(['EventEmitter.removeListener']);

export default function ChatScreen({route, props}) {
  const [recvMessages, setRecvMessages] = useState([]);
  const receiverId = route.params;
  const dispatch = useDispatch();
  // const {usserId, message, usserImage, uid, userName} = route.params;
  const userMain = useSelector(state => state?.user);
  const messag = useSelector(state => state?.messages);

  useEffect(() => {
    dispatch(loadMessages(receiverId.uid));
  }, []);

  useEffect(() => {
    const msgs = messag?.messages?.reverse().map(msg => {
      return {
        _id: msg._id,
        text: msg.text,
        createdAt: msg.created_at,
        user: {
          _id: msg.from,
          name: receiverId?.name,
        },
      };
    });
    setRecvMessages(msgs);
  }, [messag.messages]);

  const onSend = useCallback((recvMessages = []) => {
    setRecvMessages(previousMessages =>
      GiftedChat.append(previousMessages, recvMessages),
    );
    MessageService.sendMessages({
      contact_id: receiverId.uid,
      text: recvMessages[0].text,
    });
  }, []);

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
        messages={recvMessages}
        style={styles.canteiner}
        onSend={messages => onSend(messages)}
        user={{
          _id: userMain.user.id,
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
