import React, {useState, useCallback, useEffect, useLayoutEffect} from 'react';
import {Text, StyleSheet, Image, LogBox} from 'react-native';
import {useChannel, useEvent} from '@harelpls/use-pusher/react-native';
import {GiftedChat, Bubble, Send, InputToolbar} from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PostService from '../../../http/Post/post';
import {useSelector} from 'react-redux';

LogBox.ignoreLogs(['EventEmitter.removeListener']);
export function ChatContent({navigation, route}) {
  const [messages, setMessages] = useState([]);
  const {chatUser, owner_ids, getId} = route?.params;
  const [owner_id, setOwner] = useState(null);
  const {user} = useSelector(state => state.user);
  const [currentPage, setCurrentPage] = useState(1);

  const channelName = `private-message_thread.${owner_id}.${user?.id}`;
  const channel = useChannel(channelName);

  if (channel) {
    channel.bind('pusher:subscription_succeeded', function () {
      console.log('Connected!!!!');
    });
  }
  useEffect(() => {
    onLoadEarlier();
  }, []);
  useEvent(channel, 'new_message_thread', data => {
    console.log(data);
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, {
        _id: data.message_thread.id,
        text: data.message_thread.message,
        createdAt: new Date(),
        user: {
          avatar: chatUser.image ? chatUser.image : chatUser.avatar,
          _id: user?.id !== data.message_thread.user_id ? 1 : 2,
        },
      }),
    );
    _sendIDsForRead();
  });
  // }
  useEffect(() => {
    navigation
      .getParent()
      ?.setOptions({tabBarStyle: {display: 'none'}, tabBarVisible: false});

    return () => {
      // _sendIDsForRead();
      navigation
        .getParent()
        ?.setOptions({tabBarStyle: undefined, tabBarVisible: undefined});
    };
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text style={[styles.userFullName]}>
          {chatUser.full_name ? chatUser.full_name : chatUser.name}
        </Text>
      ),
      headerRight: () => (
        <Image
          source={{
            uri: chatUser.image ? chatUser.image : chatUser.avatar,
          }}
          style={styles.headerImage}
        />
      ),
    });

    _sendIDsForRead();
  }, [navigation]);

  const _sendIDsForRead = async () => {
    try {
      await PostService.realAllMEssages(owner_id);
      await PostService.messageThread(messages[0]._id);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const onLoadEarlier = async () => {
    setCurrentPage(currentPage + 1);
    const newMessages = await PostService.getSingleMessages({
      id: getId,
      page: currentPage,
    });
    if (currentPage === 1) {
      setOwner(newMessages?.data?.data[0]?.message_id);
    }
    setMessages(previousMessages => [
      ...previousMessages,
      ...newMessages.data.data.map(sms => {
        return {
          _id: sms.id,
          text: sms.message,
          createdAt: new Date(),
          user: {
            _id: user.id !== sms.user.id ? 1 : 2,
            avatar: chatUser.owner_image,
          },
        };
      }),
    ]);
  };
  const onSend = useCallback(
    (messages = []) => {
      const newMessage = messages[0];

      if (newMessage) {
        // Ensure the new message has a unique _id
        newMessage._id = Math.random().toString(36).substring(7); // Generate a unique _id
        newMessage.createdAt = new Date();
        newMessage.user = {
          _id: 1, // Assuming the user is always the sender (you can adjust this as needed)
        };

        // Update the messages state with the new message
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, newMessage),
        );

        // Send the message to the server
        PostService.sendMessages({
          owner_id: owner_ids ? owner_ids : chatUser.id,
          message_id: owner_id,
          message: newMessage.text,
        })
          .then(res => {
            // Handle the response as needed
            // console.log('Message sent successfully', res);
          })
          .catch(err => {
            // Handle any errors
            // console.error('Error sending message', err);
          });
      }
    },
    [owner_id, owner_ids],
  );

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
  console.log(messages);
  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#ED7B12',
          },
        }}
        textStyle={{
          right: {
            color: 'white',
          },
        }}
      />
    );
  };
  const renderToolbar = props => {
    return <InputToolbar {...props} containerStyle={styles.inputToolbar} />;
  };

  return (
    <GiftedChat
      messages={messages}
      // onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
      loadEarlier={(messages.length / 10) % 2 === 1}
      onLoadEarlier={onLoadEarlier}
      listViewProps={{
        onEndReached: onLoadEarlier.bind(this),
        onEndReachedThreshold: 0.5,
      }}
      messageIdGenerator={msg => msg?._id}
      //  disableComposer={block === true ? true : false}
      style={styles.canteiner}
      onSend={messages => onSend(messages)}
      // user={{_id: userMain.user.id}}
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
        color: 'black',
        zIndex: 101,
      }}
      focusTextInput={() => false}
    />
  );
}
const styles = StyleSheet.create({
  canteiner: {
    backgroundColor: '#ECECEC',
    color: 'red',
  },
  inputToolbar: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 2,
    borderRadius: 20,
    paddingTop: 3,
    backgroundColor: 'white',
    //bottom: -30,
  },
  headerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 5,
  },
  userFullName: {
    fontSize: 18,
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
