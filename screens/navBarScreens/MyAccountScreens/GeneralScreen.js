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
import {useTranslation} from 'react-i18next';
import HeaderBackSearch from '../../../components/HeaderComponents/HeaderBackSearch';
import DatePicker from 'react-native-date-picker';
import {Controller, useForm} from 'react-hook-form';
import MyaccountUsserInforAvatar from '../../../components/MyaccountUsserInforAvatar';
import {useSelector, useDispatch} from 'react-redux';
import {UploadUserService} from '../../../http/uploadService/uploadService';
import {getMe} from '../../../stores/user/userActions';

const GeneralScreen = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const user = useSelector(state => state?.user);
  const [open, setOpen] = useState(false);
  const dt = user?.user?.date_of_birth ? user?.user?.date_of_birth : new Date();
  const [dates, setDates] = useState(dt);
  const {control, handleSubmit, setValue} = useForm({
    defaultValues: {
      date_of_birth: moment(dt).toDate(),
      name: user.user?.name,
      lastname: user.user?.lastname,
      email: user.user?.email,
      phone_number: user.user?.phone_number,
    },
  });
  // useEffect(() => {
  //   const vals = getValues('interesting_type');
  //   if (vals?.length) {
  //     const mappedVals = vals.map(el => el?.id);
  //     setValuesSelect(mappedVals);
  //   }
  // }, []);

  const submitFormHandler = handleSubmit(async data => {
    Object.keys(data).map(function (key) {
      if (key === 'date_of_birth') {
        let _date = data[key];
        data[key] = moment(_date).format('YYYY-MM-DD');
      }
    });
    try {
      await UploadUserService.uploadUser(data);
      dispatch(getMe());
      alert(`${t('infoChangeSaved')}`);
    } catch {
      console.log('error');
    } finally {
    }
  });

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#FFFFFF"
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      <HeaderBackSearch serachFalse="false" />
      <ScrollView showsVerticalScrollIndicator={false} style={{width: '100%'}}>
        <MyaccountUsserInforAvatar />
        <View style={styles.action}>
          <Text style={styles.inputHeader}>{t('name')}</Text>
          <Controller
            control={control}
            name="name"
            render={({field: {onChange, value, onBlur}}) => {
              return (
                <TextInput
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
          <Text style={styles.inputHeader}>{t('lastName')}</Text>
          <Controller
            control={control}
            name="lastname"
            render={({field: {onChange, value, onBlur}}) => {
              return (
                <TextInput
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
              <Text style={styles.inputHeader}>{t('date')}</Text>
              <Text style={styles.dateText}>{moment(dates).format('ll')}</Text>
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
                  defaultShow={user?.user.date_of_birth}
                  open={open}
                  date={value}
                  onConfirm={date => {
                    setValue('date_of_birth', date);
                    setDates(date);
                    setOpen(false);
                  }}
                  onCancel={() => setOpen(false)}
                />
              );
            }}
          />
        </View>
        <View style={styles.action}>
          <Text style={styles.inputHeader}>{t('email')}</Text>
          <Controller
            control={control}
            name="email"
            render={({field: {onChange, value, onBlur}}) => {
              return (
                <TextInput
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
          <Text style={styles.inputHeader}>{t('phoneNumber')}</Text>
          <Controller
            control={control}
            name="phone_number"
            render={({field: {onChange, value, onBlur}}) => {
              return (
                <TextInput
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

        {/* <View style={styles.selectAction}>
          <MultiSelectComponent interested={valuesSelect} setValue={setValue} />
        </View> */}
        <TouchableOpacity style={styles.button} onPress={submitFormHandler}>
          <Text style={styles.buttonText}>{t('save')}</Text>
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
    paddingHorizontal: 5,
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
    height: 50,
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
    paddingVertical: 15,
    color: 'black',
    fontWeight: '800',
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
