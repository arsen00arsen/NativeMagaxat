import React, {useState, useEffect} from 'react';
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
LogBox.ignoreLogs(['EventEmitter.removeListener']);
import ImageView from 'react-native-image-viewing';

export default function ChatScreen({route, props}) {
  const [messages, setMessages] = useState([]);
  const {uid} = route.params;
  const user = useSelector(state => state.usser.firBaseUser);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageView, setSeletedImageView] = useState('');

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

  const handlePhotoPicker = (uri, path, fName) => {
    // ImagePicker.openPicker({
    //   width: 110,
    //   height: 110,
    //   cropping: true,
    // }).then(image => {
    //   setUri(image.path);
    //   props.onChange?.(image);
    // });
  };

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
            backgroundColor: '#B9AA93',
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
  const renderActions = props => {
    return (
      <Actions
        {...props}
        containerStyle={styles.photosend}
        onPressActionButton={handlePhotoPicker}
        icon={() => <FontAwesome name="camera" size={20} color="#A5A5A5" />}
      />
    );
  };
  const renderMessageImage = props => {
    return (
      <View style={{borderRadius: 15, padding: 2}}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
            setSeletedImageView(props.currentMessage.image);
          }}>
          <Image
            resizeMode="contain"
            style={styles.imgMsg}
            source={{uri: props.currentMessage.image}}
          />
          {selectedImageView ? (
            <ImageView
              imageIndex={0}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
              images={[{uri: selectedImageView}]}
            />
          ) : null}
        </TouchableOpacity>
      </View>
    );
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
        renderAvatar={null}
        renderBubble={renderBubble}
        alwaysShowSend
        renderSend={renderSend}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
        renderInputToolbar={renderToolbar}
        renderActions={renderActions}
        renderMessageImage={renderMessageImage}
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
    backgroundColor: 'red',
    marginTop: -10,
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
