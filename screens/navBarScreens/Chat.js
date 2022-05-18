import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {GiftedChat, Bubble, Send, InputToolbar} from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['EventEmitter.removeListener']);
export default function ChatScreen({route}) {
  const [messages, setMessages] = useState([]);
  const {uid} = route.params;
  const user = useSelector(state => state.usser.firBaseUser);

  const getAllMessages = async () => {
    const docid = uid > user.uid ? user.uid + '-' + uid : uid + '-' + user.uid;
    const querySanp = await firestore()
      .collection('chatrooms')
      .doc(docid)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .get();
    const allmsg = querySanp.docs.map(docSanp => {
      return {
        ...docSanp.data(),
        createdAt: docSanp.data().createdAt.toDate(),
      };
    });
    setMessages(allmsg);
  };
  useEffect(() => {
    getAllMessages();

    const docid = uid > user.uid ? user.uid + '-' + uid : uid + '-' + user.uid;
    const messageRef = firestore()
      .collection('chatrooms')
      .doc(docid)
      .collection('messages')
      .orderBy('createdAt', 'desc');

    const unSubscribe = messageRef.onSnapshot(querySnap => {
      const allmsg = querySnap.docs.map(docSanp => {
        const data = docSanp.data();
        if (data.createdAt) {
          return {
            ...docSanp.data(),
            createdAt: docSanp.data().createdAt.toDate(),
          };
        } else {
          return {
            ...docSanp.data(),
            createdAt: new Date(),
          };
        }
      });
      setMessages(allmsg);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const onSend = messageArray => {
    const msg = messageArray[0];
    const mymsg = {
      ...msg,
      sentBy: user.uid,
      sentTo: uid,
      createdAt: new Date(),
    };
    setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg));
    const docid = uid > user.uid ? user.uid + '-' + uid : uid + '-' + user.uid;

    firestore()
      .collection('chatrooms')
      .doc(docid)
      .collection('messages')
      .add({...mymsg, createdAt: firestore.FieldValue.serverTimestamp()});
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
  const renderToolbar = props => {
    return <InputToolbar {...props} containerStyle={styles.inputToolbar} />;
  };
  return (
    <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
      <GiftedChat
        messages={messages}
        style={styles.canteiner}
        onSend={text => onSend(text)}
        user={{
          _id: user.uid,
        }}
        renderBubble={renderBubble}
        alwaysShowSend
        renderSend={renderSend}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
        renderInputToolbar={renderToolbar}
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
    paddingTop: 5,
    backgroundColor: 'red',
  },
});
