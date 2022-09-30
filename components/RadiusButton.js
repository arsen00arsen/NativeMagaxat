import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useForm} from 'react-hook-form';
import Entypo from 'react-native-vector-icons/Entypo';
import ChechBox from './ChechBox';
import {useSelector} from 'react-redux';
import UserService from '../http/authService/authService';

const RadiusButton = ({id}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const {control, handleSubmit} = useForm();
  const type = useSelector(state => state.user.report);
  const submitFormHandler = handleSubmit(async data => {
    let object = {sent_id: id, type: type, ...data};
    Alert.alert('Thank you, your report has been sent. ');
    setIsShow(false);
    setModalVisible(false);
    UserService.reportSend(object)
      .then(res => console.log(res))
      .catch(error => console.log(error));
    console.log(object);
  });

  return (
    <View>
      <TouchableOpacity onPress={() => setIsShow(!isShow)} delayPressIn={150}>
        <View style={styles.button1}>
          <Entypo name="dots-three-vertical" color="#8A8A8A" size={10} />
        </View>
      </TouchableOpacity>
      {isShow === true ? (
        <View style={styles.button2}>
          <TouchableOpacity
            style={styles.reportButton}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.reportButtonText}> Report</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      <View style={styles.centeredView}>
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
                  <ChechBox
                    title="Spam or scam"
                    number="first"
                    control={control}
                    rules={{
                      required: 'Please write a message',
                      minLength: {
                        value: 1,
                        message: 'Please write a message',
                      },
                    }}
                  />
                </View>
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    onPress={submitFormHandler}
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
    </View>
  );
};

export default RadiusButton;

const styles = StyleSheet.create({
  button1: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#8A8A8A',
    padding: 5,
  },
  button2: {
    position: 'absolute',
    top: 30,
    right: 0,
    zIndex: 2,
  },
  reportButton: {
    borderWidth: 1,
    borderColor: '#8A8A8A',
    paddingHorizontal: 10,
    borderRadius: 5,
    paddingVertical: 5,
    width: 80,
    backgroundColor: 'silver',
  },
  reportButtonText: {
    color: 'white',
  },

  //
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
    height: 'auto',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'space-around',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    backgroundColor: '#5f5a5ae3',
    height: '100%',
  },
  buttonClose: {
    backgroundColor: '#013220',
    marginBottom: 15,
    width: '48%',
    paddingVertical: 10,
    borderRadius: 7,
  },
  buttonClose2: {
    marginBottom: 15,
    width: '48%',
    paddingVertical: 10,
    borderRadius: 7,
    color: '#1f1f1f',
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
    textAlign: 'center',
  },
});