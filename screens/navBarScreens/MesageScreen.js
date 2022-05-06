import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import HeaderBackSearch from '../../components/HeaderComponents/HeaderBackSearch';
import {baseUrl2} from './../../http/index';
import PushNotification from 'react-native-push-notification';

const Message = [
  {
    id: '1',
    usserName: 'Nikol Pashinyan',
    usserImag: require('../../assets/Nikol.png'),
    messageTime: 'One Day ago',
    messageText: 'Yev ayt mek marte dues',
  },
  {
    id: '2',
    usserName: 'Serj Sargsyan',
    usserImag: require('../../assets/Serj.png'),
    messageTime: '6 Yers ago',
    messageText: 'Razmakan arumov et taracqnere voshmi nshanakutyun chunen',
  },
  {
    id: '3',
    usserName: 'Robert Qocharyan',
    usserImag: require('../../assets/Robert.png'),
    messageTime: '20 Yers ago',
    messageText: 'Hayr mer vor erkinqnes surb yexece anun qo',
  },
];

const MesageScreen = () => {
  const [data, setData] = useState('');
  const navigation = useNavigation();
  useEffect(() => {
    const url = baseUrl2 + '/messages';
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchData();
  }, []);

  const handleNotification = item => {
    PushNotification.localNotification({
      channelId: 'test-channel',
      title: item.usserName,
      message: item.messageText,
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.messageBody}>
        {/* <FlatList
          data={Message}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Chat', {
                  userName: item.usserName,
                  usserId: item.id,
                  message: item.messageText,
                  usserImage: item.usserImag,
                })
              }>
              <View style={styles.messageContainer}>
                <View>
                  <Image style={styles.userImg} source={item.usserImag} />
                </View>
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{item.usserName}</Text>
                  <Text style={styles.userMessageView} numberOfLines={2}>
                    {item.messageText}
                  </Text>
                </View>
                <View style={styles.messageInfo}>
                  <Text style={styles.messageTime}>{item.messageTime} </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        /> */}
        <FlatList
          data={Message}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => handleNotification(item)}>
              <View style={styles.messageContainer}>
                <View>
                  <Image style={styles.userImg} source={item.usserImag} />
                </View>
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{item.usserName}</Text>
                  <Text style={styles.userMessageView} numberOfLines={2}>
                    {item.messageText}
                  </Text>
                </View>
                <View style={styles.messageInfo}>
                  <Text style={styles.messageTime}>{item.messageTime} </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default MesageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 15,
    position: 'relative',
  },
  messageBody: {
    height: '90%',
    width: '100%',
  },
  messageContainer: {
    width: '100%',
    height: 100,
    backgroundColor: '#E6E6E6',
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    marginBottom: 10,
  },
  userImg: {
    width: 52,
    height: 52,
    borderRadius: 50,
  },
  userInfo: {
    width: '55%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  userName: {
    color: '#343333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  userMessageView: {
    color: '#696969',
    fontSize: 12,
  },
  messageInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '20%',
  },
  messageTime: {
    color: '#343333',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  messageCountBody: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 17,
    height: 17,
    borderRadius: 50,
    backgroundColor: 'tomato',
  },
  messageCount: {
    fontSize: 13,
    color: '#FFFFFF',
  },
});
