import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import RadiusButton from '../RadiusButton';

const ChatHeader = props => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const _isUserBlock = props.isUserBlock;
  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.badgedIcon}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        locations={[0.0, 0.9]}
        colors={['#D1C7B9', '#D2C8B9']}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
      </LinearGradient>
      <View style={styles.userChat}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('AccounProfiletScreen', {
              id: props?.user.uid,
            })
          }>
          <Image
            source={{uri: props?.user.image}}
            resizeMode="center"
            style={styles.usersProfileBGimage}
          />
        </TouchableOpacity>
        <View style={styles.chatTitle}>
          <Text style={styles.paramsName}>{props?.user?.name}</Text>
        </View>
      </View>
      <View>
        {/* <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
          <Entypo
            name="block"
            size={24}
            color={props.isBlock === false ? 'black' : 'red'}
          />
        </TouchableOpacity> */}
        <View style={{marginBottom: -40, zIndex: 100}}>
          {props?.isBlock === true ? (
            <Octicons
              name="blocked"
              size={21}
              color="red"
              style={{marginBottom: 20}}
            />
          ) : (
            <RadiusButton types="user" id={props?.id} chat />
          )}
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{width: '100%', height: '100%'}}>
              <View>
                {props.isBlock === false ? (
                  <Text style={{fontSize: 19, color: 'black', paddingTop: 30}}>
                    Are you suare you want to block this user?
                  </Text>
                ) : (
                  <Text style={{fontSize: 19, color: 'black', paddingTop: 30}}>
                    Are you suare you want to unblock this user?
                  </Text>
                )}
              </View>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  onPress={() => {
                    _isUserBlock(), setModalVisible(!modalVisible);
                  }}
                  style={[styles.button, styles.buttonClose2]}>
                  <Text style={styles.textStyle2}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(false)}>
                  <Text style={styles.textStyle}>Close</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 10,
    marginTop: Platform.OS === 'ios' ? 45 : 0,
    borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
    borderBottomColor: Platform.OS === 'ios' ? 'silver' : 'white',
    paddingBottom: Platform.OS === 'ios' ? 18 : 0,
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  badgedIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 47,
    height: 47,
    borderRadius: 5,
  },
  logo: {
    width: 146,
  },
  logoContainer: {
    paddingTop: 10,
  },
  paramsName: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  chatTitle: {
    display: 'flex',
    flexDirection: 'column',
  },
  usersProfileBGimage: {
    width: 44,
    height: 44,
    borderRadius: 50,
    marginRight: 30,
  },
  userChat: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalView: {
    marginVertical: 40,
    marginHorizontal: 20,
    backgroundColor: '#e6e6e6',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: 250,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    backgroundColor: '#5f5a5ae3',
    height: 100,
  },
  buttonClose: {
    backgroundColor: '#013220',
    marginBottom: 15,
    width: '48%',
    borderRadius: 7,
    height: 40,
  },
  buttonClose2: {
    marginBottom: 15,
    width: '48%',
    paddingVertical: 10,
    borderRadius: 7,
    color: '#1f1f1f',
    height: 50,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textStyle2: {
    color: '#1f1f1f',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});
