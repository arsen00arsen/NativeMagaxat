import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '@react-navigation/native';
import HeaderBackSearch from '../../../components/HeaderComponents/HeaderBackSearch';
import {useDispatch, useSelector} from 'react-redux';
import {logoutUser, remove} from '../../../stores/user/userActions';
import LinearGradient from 'react-native-linear-gradient';
import SelectorLanguage from '../../../components/SelectorLanguage';

const SettingsScreen = () => {
  const theme = useTheme();
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector(state => state?.user);
  const [modalVisible, setModalVisible] = useState(false);

  const removeUser = () => {
    dispatch(remove(user.user.id));
  };
  const logOut = () => {
    dispatch(logoutUser());
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#FFFFFF"
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      <HeaderBackSearch serachFalse="false" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{width: '100%', paddingHorizontal: 5}}>
        <View style={styles.action}>
          <Text style={styles.inputHeader}>{t('language_title')}</Text>
          <SelectorLanguage />
        </View>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  {t('delete_account_prompt')}
                </Text>
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonClose2]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.textStyle}>
                      {t('delete_account_no')}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonClose]}
                    onPress={removeUser}>
                    <Text style={styles.textStyle2}>
                      {t('delete_account_yes')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
        <TouchableOpacity onPress={logOut} style={styles.action}>
          <LinearGradient colors={['#88673A', '#3C3835']} style={styles.signIn}>
            <Text style={styles.textSign}>{t('sign_out')}</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.action}>
          <LinearGradient colors={['#88673A', '#3C3835']} style={styles.signIn}>
            <Text style={styles.textSign}>{t('delete_account')}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 15,
    backgroundColor: '#f7f7f7',
    height: '100%',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingLeft: 10,
    color: '#222222',
    height: '100%',
    width: '100%',
    borderRadius: 8,
    fontSize: 14,
    fontWeight: '700',
  },
  action: {
    flexDirection: 'column',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    backgroundColor: '#FFFFFF',
    width: '100%',
    minHeight: 60,
    borderRadius: 8,
    alignItems: 'flex-start',
  },
  inputHeader: {
    fontSize: 12,
    color: '#828282',
    paddingTop: 7,
    paddingLeft: 12,
  },
  icon: {
    paddingLeft: 10,
    bottom: 15,
  },
  signIn: {
    width: '100%',
    borderRadius: 8,
    minHeight: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 21,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    backgroundColor: '#5f5a5ae3',
  },
  modalView: {
    marginVertical: 40,
    marginHorizontal: 20,
    backgroundColor: '#e6e6e6',
    borderRadius: 15,
    paddingHorizontal: 30,
    paddingVertical: 20,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: '48%',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#750000',
    marginBottom: 5,
    width: '48%',
    paddingVertical: 10,
    borderRadius: 7,
    color: '#e6e6e6',
  },
  buttonClose2: {
    backgroundColor: '#013220',
    marginBottom: 5,
    width: '48%',
    paddingVertical: 10,
    borderRadius: 7,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 30,
    textAlign: 'center',
  },
  modalButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  textStyle2: {
    color: '#e6e6e6',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    paddingHorizontal: 12,
    color: 'black',
    fontWeight: '700',
    fontSize: 16,
    paddingVertical: 8,
    bottom: 5,
    minWidth: 350,
  },
});
