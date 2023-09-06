import React, {useState, useCallback, useEffect, useLayoutEffect} from 'react';
import {Text, StyleSheet, Image} from 'react-native';
import {GiftedChat, Bubble, Send, InputToolbar} from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PostService from '../../../http/Post/post';
import {useSelector} from 'react-redux';
export function ChatContent({navigation, route}) {
  const [messages, setMessages] = useState([]);
  const {chatUser} = route?.params;
  console.log(chatUser, 'chatUser');
  const {user} = useSelector(state => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    navigation
      .getParent()
      ?.setOptions({tabBarStyle: {display: 'none'}, tabBarVisible: false});
    return () =>
      navigation
        .getParent()
        ?.setOptions({tabBarStyle: undefined, tabBarVisible: undefined});
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text style={[styles.userFullName]}>
          {chatUser.owner ? chatUser.owner : chatUser.name}
        </Text>
      ),
      headerRight: () => (
        <Image
          source={{
            uri: chatUser.owner_image ? chatUser.owner_image : chatUser.avatar,
          }}
          style={styles.headerImage}
        />
      ),
    });
    onLoadEarlier();
  }, [navigation]);

  const onLoadEarlier = async () => {
    setCurrentPage(currentPage + 1);
    const newMessages = await PostService.getSingleMessages({
      id: chatUser?.id,
      page: currentPage,
    });
    if (currentPage === 1) {
      setIsLoading(false);
    }
    setMessages(previousMessages => [
      ...previousMessages,
      ...newMessages.data.data.map(sms => {
        return {
          _id: sms.id,
          text: sms.message,
          createdAt: new Date(),
          user: {
            _id: user.id !== chatUser?.id ? 1 : 2,
            avatar: chatUser.owner_image,
          },
        };
      }),
    ]);
  };
  const onSend = useCallback((messages = []) => {
    PostService.sendMessages({
      owner_id: chatUser.owner_id ? chatUser.owner_id : chatUser.id,
      message: messages[0].text,
    })
      .then(res => {
        // console.log(res);
      })
      .catch(err => console.log(err.response));
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
