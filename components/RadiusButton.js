import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import {useForm} from 'react-hook-form';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ChechBox from './ChechBox';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import UserService from '../http/authService/authService';
import {loadPosts} from '../stores/post/postActions';
import {loadStori} from '../stores/stories/storiesAction';
import {Controller} from 'react-hook-form';
import {useTranslation} from 'react-i18next';

const RadiusButton = ({id, types, chat}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [block, setBlock] = useState();
  const [isShow, setIsShow] = useState(false);
  const {control, handleSubmit} = useForm();
  const type = useSelector(state => state.user.report);

  const submitFormHandler = handleSubmit(async data => {
    let object = {model_id: id, model_type: types, message: type};
    setIsShow(false);
    setBlock();
    setModalVisible(false);
    UserService.reportSend(object)
      .then(() => {
        if (types === 'post') {
          dispatch(loadPosts(1));
        } else if (types === 'story') {
          dispatch(loadStori());
        }
      })
      .catch(error => console.log(error, 'erroir'));
    Alert.alert(`${t('reportSend')}`);
    navigation.navigate('HomeScreen');
  });
  return (
    <View style={styles.mainDiv}>
      <TouchableOpacity onPress={() => setIsShow(!isShow)} delayPressIn={150}>
        <Ionicons name="md-ellipsis-vertical" color="#c5c3c3" size={20} />
      </TouchableOpacity>
      {isShow === true ? (
        <View style={styles.button2}>
          {chat ? (
            <TouchableOpacity
              style={[styles.reportButton, {borderTopWidth: 0}]}
              onPress={() => {
                setModalVisible(!modalVisible), setBlock('block');
              }}>
              <Text style={styles.reportButtonText}>{t('block')}</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                style={styles.reportButton}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.reportButtonText}>{t('report')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.reportButton, {borderTopWidth: 0}]}
                onPress={() => {
                  setModalVisible(!modalVisible), setBlock('block');
                }}>
                <Text style={styles.reportButtonText}>{t('block')}</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      ) : null}

      <Modal
        animationType="fild"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {block === 'block' ? (
              <View>
                {types === 'user' ? (
                  <Text
                    style={{
                      marginVertical: 50,
                      textAlign: 'center',
                      fontSize: 25,
                      fontWeight: '700',
                    }}>
                    {t('areYouSureForBlockUser')}
                  </Text>
                ) : (
                  <Text
                    style={{
                      marginVertical: 50,
                      textAlign: 'center',
                      fontSize: 25,
                      fontWeight: '700',
                    }}>
                    {t('areYouSureForBlockContent')}
                  </Text>
                )}
              </View>
            ) : (
              <View>
                {chat ? (
                  <Controller
                    control={control}
                    name="message"
                    rules={{
                      required: t('writeResonMessage'),
                      minLength: {
                        value: 1,
                        message: t('writeResonMessage'),
                      },
                    }}
                    render={({
                      field: {onChange, value, onBlur},
                      fieldState: {error},
                    }) => {
                      return (
                        <>
                          <Text
                            style={{
                              marginTop: 50,
                              textAlign: 'center',
                              fontSize: 25,
                              fontWeight: '700',
                            }}>
                            {t('blockMessages')}
                          </Text>
                          <Text
                            style={{
                              marginVertical: 5,
                              textAlign: 'center',
                              fontSize: 12,
                            }}>
                            {t('conversetionInChat')}
                          </Text>
                          <TextInput
                            placeholder={t('reasonForBlock')}
                            style={styles.textInput}
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            multiline
                            underlineColorAndroid="white"
                          />
                          {error && (
                            <Text
                              style={{
                                color: 'red',
                                alignSelf: 'stretch',
                                width: 250,
                              }}>
                              {error.message || 'Error'}
                            </Text>
                          )}
                        </>
                      );
                    }}
                  />
                ) : (
                  <ChechBox
                    types={types}
                    title="Spam or scam"
                    number="first"
                    control={control}
                    rules={{
                      required: t('writeResonMessage'),
                      minLength: {
                        value: 1,
                        message: t('writeResonMessage'),
                      },
                    }}
                  />
                )}
              </View>
            )}

            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={submitFormHandler}
                style={[styles.button, styles.buttonClose2]}>
                {block === 'block' ? (
                  <Text style={styles.textStyle2}>
                    {t('delete_account_yes')}
                  </Text>
                ) : (
                  <Text style={styles.textStyle2}>
                    {t('delete_account_yes')}
                  </Text>
                )}
                {/* <Text style={styles.textStyle2}>Submit</Text> */}
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(false), setBlock();
                }}>
                {block === 'block' ? (
                  <Text style={styles.textStyle}>{t('delete_account_no')}</Text>
                ) : (
                  <Text style={styles.textStyle}>{t('colse')}</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    width: 22,
  },
  button2: {
    position: 'absolute',
    top: 30,
    backgroundColor: 'white',
    right: 0,
    zIndex: 25,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#555',

    // width: 80,
  },
  reportButton: {
    width: 140,
    paddingHorizontal: 10,
    paddingVertical: 5,
    display: 'flex',
    justifyContent: 'center',
  },
  reportButtonText: {
    color: 'black',
    zIndex: 25,
  },
  textInput: {
    height: 80,
    borderColor: 'silver',
    borderWidth: 1,
    marginTop: 50,
    borderRadius: 8,
    marginBottom: 30,
    padding: 10,
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
    backgroundColor: 'white',
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
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    backgroundColor: '#000e',
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
  mainDiv: {
    // height: 60,
    backgroundColor: 'transparent',
  },
});
