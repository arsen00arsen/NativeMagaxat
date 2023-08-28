import React from 'react';
import {StyleSheet, View, TouchableOpacity, Modal, Text} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Button from '../../Elements/Button';
import PostService from '../../http/Post/post';
import UserService from '../../http/Account/account';

const DeleteAccountModal = ({modalVisible, setModalVisible, id}) => {
  const {t} = useTranslation();

  const deleteAccount = async () => {
    try {
      const {data} = await UserService.delete();
    } catch (error) {
      console.log(error.response, ';;;;');
    } finally {
      setModalVisible(false);
    }
  };
  return (
    <View>
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.modal__overlay}>
            <View style={[styles.modalView, {backgroundColor: 'white'}]}>
              <Text
                style={{
                  marginBottom: 10,
                  textAlign: 'left',
                  fontSize: 25,
                  fontWeight: '700',
                }}>
                Delete Account ?
              </Text>
              <Text
                style={{
                  marginBottom: 15,
                  textAlign: 'left',
                  fontSize: 18,
                  fontWeight: '400',
                }}>
                Are you sure want to delete account?
              </Text>
              <View style={styles.buttons}>
                <Button
                  isTransparent
                  onPress={() => setModalVisible(false)}
                  style={{
                    width: '49%',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'row',
                  }}>
                  <Text style={{color: '#4F48EC', fontSize: 18}}>Cancel</Text>
                </Button>
                <Button
                  style={{
                    width: '49%',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'row',
                  }}
                  onPress={deleteAccount}>
                  <Text style={{color: 'white', fontSize: 18}}>Delete</Text>
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};
export default DeleteAccountModal;
const styles = StyleSheet.create({
  modalView: {
    marginVertical: 250,
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 15,
    // alignItems: 'center',
    width: 300,
  },
  modal__overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    backgroundColor: '#000000e6',
  },
  container: {
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginVertical: 5,
  },
  textInput: {
    borderColor: '#E5E5E5',
    borderWidth: 1,
    borderRadius: 20,
    marginVertical: 15,
    marginHorizontal: 'auto',
    maxHeight: 150,
    width: '100%',
    color: 'black',
    fontSize: 16,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    maxWidth: 330,
    paddingVertical: 10,
  },

  onlyIos: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
    zIndex: 5,
    width: 35,
    height: 35,
  },

  requestButton: {
    width: '100%',
    height: 50,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
    borderRadius: 8,
  },
  buttons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
});
