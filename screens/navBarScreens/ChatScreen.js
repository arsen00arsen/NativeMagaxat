import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';

const ChatScreen = ({route, navigation}) => {
  const [messages, setMessages] = useState([]);
  const {usserId, message, usserImage, userName} = route.params;
  useEffect(() => {
    setMessages([
      {
        _id: usserId,
        text: message,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: userName,
          avatar: usserImage,
        },
      },
    ]);
  }, []);
  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
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
  return (
    <GiftedChat
      messages={messages}
      style={styles.canteiner}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
    />
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  canteiner: {
    backgroundColor: '#ECECEC',
  },
});
