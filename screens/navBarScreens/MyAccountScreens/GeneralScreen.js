import React, {useState, useEffect} from 'react';
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
import {useTheme, useIsFocused} from '@react-navigation/native';
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
  const isFocused = useIsFocused();
  const [date, setDate] = useState(new Date());
  const user = useSelector(state => state?.user);
  const [open, setOpen] = useState(false);
  const [valuesSelect, setValuesSelect] = useState([]);
  // useEffect(() => {
  //   if (isFocused) {
  //   }
  // }, [isFocused]);
  const dt = user?.user?.date_of_birth ? user?.user?.date_of_birth : new Date();
  const {control, handleSubmit, getValues, setValue} = useForm({
    defaultValues: {
      date_of_birth: moment(dt).toDate(),
      name: user.user?.name,
      lastname: user.user?.lastname,
      email: user.user?.email,
      phone_number: user.user?.phone_number,
      // interesting_type: user.user?.interesting_type,
    },
  });

  useEffect(() => {
    const vals = getValues('interesting_type');
    if (vals?.length) {
      const mappedVals = vals.map(el => el?.id);
      setValuesSelect(mappedVals);
    }
  }, [dispatch]);
  const submitFormHandler = handleSubmit(async data => {
    Object.keys(data).map(function (key) {
      if (key === 'date_of_birth') {
        let _date = data[key];
        data[key] = moment(_date).format('YYYY-MM-DD');
      }
    });
    try {
      await UploadUserService.uploadUser(data);
    } catch {
      console.log('error');
    }
  });

  if (!Object.values(user.user).length) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
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
              {}
              <Text style={styles.dateText}>
                {moment(dt).format('YYYY-MM-DD')}
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
                  defaultShow={user?.user.date_of_birth}
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
          <MultiSelectComponent interested={valuesSelect} setValue={setValue} />
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

// const pickerSelectStyles = StyleSheet.create({
//   inputIOS: {
//     fontSize: 16,
//     paddingVertical: 12,
//     paddingHorizontal: 10,
//     color: 'black',
//     paddingRight: 30, // to ensure the text is never behind the icon
//   },
//   inputAndroid: {
//     paddingHorizontal: 12,
//     color: 'black',
//     fontWeight: '700',
//     fontSize: 16,
//     paddingVertical: 8,
//     bottom: 5,
//     minWidth: 350,
//   },
// });

// import React, {Component} from 'react';
// import {
//   TextInput,
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Alert,
// } from 'react-native';
// import NotifService from '../../../utils/NotifService';

// export default class GeneralScreen extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};

//     this.notif = new NotifService(
//       this.onRegister.bind(this),
//       this.onNotif.bind(this),
//     );
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.title}>
//           Example app react-native-push-notification
//         </Text>
//         {/* <View style={styles.spacer} />
//         <TextInput
//           style={styles.textField}
//           value={this.state.registerToken}
//           placeholder="Register token"
//         />
//         <View style={styles.spacer} /> */}

//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => {
//             this.notif.localNotif();
//           }}>
//           <Text>Local Notification (now)</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => {
//             this.notif.localNotif('sample.mp3');
//           }}>
//           <Text>Local Notification with sound (now)</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => {
//             this.notif.scheduleNotif();
//           }}>
//           <Text>Schedule Notification in 30s</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => {
//             this.notif.scheduleNotif('sample.mp3');
//           }}>
//           <Text>Schedule Notification with sound in 30s</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => {
//             this.notif.cancelNotif();
//           }}>
//           <Text>Cancel last notification (if any)</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => {
//             this.notif.cancelAll();
//           }}>
//           <Text>Cancel all notifications</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => {
//             this.notif.checkPermission(this.handlePerm.bind(this));
//           }}>
//           <Text>Check Permission</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => {
//             this.notif.requestPermissions();
//           }}>
//           <Text>Request Permissions</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => {
//             this.notif.abandonPermissions();
//           }}>
//           <Text>Abandon Permissions</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => {
//             this.notif.getScheduledLocalNotifications(notifs =>
//               console.log(notifs),
//             );
//           }}>
//           <Text>Console.Log Scheduled Local Notifications</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => {
//             this.notif.getDeliveredNotifications(notifs => console.log(notifs));
//           }}>
//           <Text>Console.Log Delivered Notifications</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => {
//             this.notif.createOrUpdateChannel();
//           }}>
//           <Text>Create or update a channel</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => {
//             this.notif.popInitialNotification();
//           }}>
//           <Text>popInitialNotification</Text>
//         </TouchableOpacity>

//         <View style={styles.spacer} />

//         {this.state.fcmRegistered && <Text>FCM Configured !</Text>}

//         <View style={styles.spacer} />
//       </View>
//     );
//   }

//   onRegister(token) {
//     this.setState({registerToken: token.token, fcmRegistered: true});
//   }

//   onNotif(notif) {
//     Alert.alert(notif.title, notif.message);
//   }

//   handlePerm(perms) {
//     Alert.alert('Permissions', JSON.stringify(perms));
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   button: {
//     borderWidth: 1,
//     borderColor: '#000000',
//     margin: 5,
//     padding: 5,
//     width: '70%',
//     backgroundColor: '#DDDDDD',
//     borderRadius: 5,
//   },
//   textField: {
//     borderWidth: 1,
//     borderColor: '#AAAAAA',
//     margin: 5,
//     padding: 5,
//     width: '70%',
//   },
//   spacer: {
//     height: 10,
//   },
//   title: {
//     fontWeight: 'bold',
//     fontSize: 20,
//     textAlign: 'center',
//   },
// });
