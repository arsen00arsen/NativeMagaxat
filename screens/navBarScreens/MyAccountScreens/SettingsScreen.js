import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import HeaderBackSearch from '../../../components/HeaderComponents/HeaderBackSearch';
import {useDispatch, useSelector} from 'react-redux';
import {logoutUser, remove} from '../../../stores/user/userActions';
import LinearGradient from 'react-native-linear-gradient';

const SettingsScreen = ({navigation}) => {
  const theme = useTheme();
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
      <ScrollView showsVerticalScrollIndicator={false} style={{width: '100%'}}>
        <View style={{marginBottom: 20}}>{/* <MyaccountUsserInfor /> */}</View>
        <View style={styles.action}>
          <Text style={styles.inputHeader}>Language</Text>
          {/* <RNPickerSelect
            placeholder={{label: '', value: 'Interesting Area 5'}}
            useNativeAndroidPickerStyle={false}
            style={{
              ...pickerSelectStyles,
              iconContainer: {
                top: 10,
                right: 20,
              },
            }}
            onValueChange={value => console.log(value)}
            items={[
              {label: 'English', value: 'english'},
              {label: 'Armenian', value: 'armenian'},
            ]}
            Icon={() => {
              return (
                <Icon
                  name="chevron-down"
                  size={18}
                  color="#909090"
                  style={styles.icon}
                />
              );
            }}
          /> */}
          <Text style={styles.textInput}> English</Text>
        </View>
        {/* <View style={styles.action}>
          <Text style={styles.inputHeader}>Password</Text>
          <TextInput
            placeholderTextColor="#666666"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={val => console.log(val)}
            placeholder="Change Password"
          />
        </View> */}
        {/* <View style={styles.action}>
          <Text style={styles.inputHeader}>About</Text>
          <TextInput
            placeholderTextColor="#666666"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={val => console.log(val)}
            placeholder="About Us"
          />
        </View> */}
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
                <Text style={styles.modalText}>Are you sure?</Text>
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonClose2]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.textStyle}>No</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonClose]}
                    onPress={removeUser}>
                    <Text style={styles.textStyle2}>Yes</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
        <TouchableOpacity onPress={logOut} style={styles.action}>
          <LinearGradient colors={['#88673A', '#3C3835']} style={styles.signIn}>
            <Text style={styles.textSign}>Log Out</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.action}>
          <LinearGradient colors={['#88673A', '#3C3835']} style={styles.signIn}>
            <Text style={styles.textSign}>Delete Account</Text>
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
    paddingHorizontal: 15,
    paddingTop: 15,
    backgroundColor: '#F2F2F2',
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
