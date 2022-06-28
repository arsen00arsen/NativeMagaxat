import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import {useTheme} from '@react-navigation/native';
import HeaderBackSearch from '../../../components/HeaderComponents/HeaderBackSearch';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/Feather';
import DatePicker from 'react-native-date-picker';
import {Controller, useForm} from 'react-hook-form';
import MyaccountUsserInforAvatar from '../../../components/MyaccountUsserInforAvatar';
import {useSelector, useDispatch} from 'react-redux';
import MultiSelectComponent from '../../../components/MultiSelectComponent';
import {UploadUserService} from '../../../http/uploadService/uploadService';

const GeneralScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [date, setDate] = useState(new Date());
  const user = useSelector(state => state?.user);
  const [open, setOpen] = useState(false);
  const {control, handleSubmit, getValues} = useForm({
    defaultValues: {
      date_of_birth: new Date(),
    },
  });
  const interested = user?.user?.interesting_type.map(id => {
    return id.id;
  });

  const submitFormHandler = handleSubmit(async data => {
    dispatch({type: 'INFOCHANGE_STEP_SUBMIT', payload: data});
    try {
      await UploadUserService.uploadUser(user.infoChange);
    } catch {
      console.log('error');
    } finally {
    }
  });

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#009387"
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      <HeaderBackSearch />
      <ScrollView showsVerticalScrollIndicator={false} style={{width: '100%'}}>
        <MyaccountUsserInforAvatar />
        <View style={styles.action}>
          <Text style={styles.inputHeader}>Name</Text>
          <Controller
            control={control}
            name="name"
            render={({field: {onChange, value, onBlur}}) => {
              return (
                <TextInput
                  placeholder={user?.user?.name}
                  placeholderTextColor="#666666"
                  value={value}
                  style={styles.textInput}
                  onChangeText={onChange}
                  underlineColorAndroid="white"
                />
              );
            }}
          />
        </View>
        <View style={styles.action}>
          <Text style={styles.inputHeader}>Last Name</Text>
          <Controller
            control={control}
            name="lastname"
            render={({field: {onChange, value, onBlur}}) => {
              return (
                <TextInput
                  placeholder={user?.user?.lastname}
                  placeholderTextColor="#666666"
                  value={value}
                  style={styles.textInput}
                  onChangeText={onChange}
                  underlineColorAndroid="white"
                />
              );
            }}
          />
        </View>
        <View>
          <TouchableOpacity style={styles.action} onPress={() => setOpen(true)}>
            <View>
              <Text style={styles.inputHeader}>Date</Text>
              <Text style={styles.dateText}>
                {user?.user?.date_of_birth
                  ? moment(user?.user?.date_of_birth).format('DD.MM.YYYY')
                  : moment(date).format('DD.MM.YYYY')}
              </Text>
            </View>
          </TouchableOpacity>
          <Controller
            control={control}
            name="date_of_birth"
            render={({field: {value, onChange}}) => {
              return (
                <DatePicker
                  title="Select date"
                  mode="date"
                  modal
                  open={open}
                  date={value}
                  onConfirm={date => {
                    setDate(date);
                    setOpen(false);
                  }}
                  onCancel={() => setOpen(false)}
                />
              );
            }}
          />
        </View>
        <View style={styles.action}>
          <Text style={styles.inputHeader}>E-mail</Text>
          <Controller
            control={control}
            name="email"
            render={({field: {onChange, value, onBlur}}) => {
              return (
                <TextInput
                  placeholder={user?.user?.email}
                  placeholderTextColor="#666666"
                  value={value}
                  style={styles.textInput}
                  onChangeText={onChange}
                  underlineColorAndroid="white"
                />
              );
            }}
          />
        </View>
        <View style={styles.action}>
          <Text style={styles.inputHeader}>Phone Number</Text>
          <Controller
            control={control}
            name="phone_number"
            render={({field: {onChange, value, onBlur}}) => {
              return (
                <TextInput
                  placeholder={user?.user?.phone_number}
                  placeholderTextColor="#666666"
                  value={value}
                  style={styles.textInput}
                  onChangeText={onChange}
                  underlineColorAndroid="white"
                />
              );
            }}
          />
        </View>

        <View style={styles.selectAction}>
          <MultiSelectComponent interested={interested} />
        </View>
        <TouchableOpacity style={styles.button} onPress={submitFormHandler}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default GeneralScreen;

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
    color: 'black',
    // height: '100%',
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
    // height: 60,
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
  button: {
    width: '100%',
    height: 60,
    borderRadius: 8,
    backgroundColor: '#BB9E79',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  dateText: {
    paddingHorizontal: 13,
    paddingVertical: 25,
    color: 'black',
  },
  selectAction: {
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 8,
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
