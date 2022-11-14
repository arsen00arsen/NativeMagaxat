import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Controller, useForm} from 'react-hook-form';
import moment from 'moment';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/Feather';
import CustomInput from '../components/loginComponents/CustomInput';

const SignUpScreen = ({navigation}) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const {control, handleSubmit} = useForm({
    defaultValues: {
      date_of_birth: new Date(),
    },
  });
  const dispatch = useDispatch();
  const submitFormHandler = handleSubmit(data => {
    dispatch({
      type: 'FIRST_STEP_SUBMIT',
      payload: {
        ...data,
        date_of_birth: moment(data).format('YYYY-MM-DD'),
      },
    });
    navigation.navigate('AccountInfoScreen');
  });

  return (
    <LinearGradient
      start={{x: 1, y: 1}}
      end={{x: 1, y: 0}}
      colors={['#cbb085', '#B8B8B8', '#cbb085']}
      style={styles.linearGradient}>
      <StatusBar backgroundColor="#cbb085" barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.headerWidthButton}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="chevron-left" color={'#FFFFFF'} size={45} />
            </TouchableOpacity>
            <View style={styles.titlecontent}>
              <Text style={styles.text}>Create Your Profile</Text>
              <Animatable.Image
                animation="fadeInUpBig"
                duraton="1500"
                source={require('../assets/logo.png')}
                style={styles.logo}
                resizeMode="stretch"
              />
            </View>
            <View />
          </View>
          <View>
            <CustomInput
              style={styles.nameInput}
              name="name"
              control={control}
              title="First Name"
              rules={{
                required: 'Name required',
                minLength: {
                  value: 1,
                  message: 'Name cannot be empoty',
                },
              }}
            />
            <CustomInput
              name="lastname"
              control={control}
              title="Last Name"
              rules={{
                required: 'Last Name required',
                minLength: {
                  value: 1,
                  message: 'Last Name cannot be empoty',
                },
              }}
            />
            <View>
              <TouchableOpacity
                style={styles.action}
                onPress={() => setOpen(true)}>
                <View>
                  <Text style={styles.inputHeader}>Date</Text>
                  <Text style={styles.dateText}>
                    <Text style={styles.dateBT}>
                      {moment(date).format('DD.MM.YYYY')}
                    </Text>
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
          </View>
          <View>
            <TouchableOpacity style={styles.button} onPress={submitFormHandler}>
              <View />
              <Text style={styles.textSign}>Next</Text>
              <Icon name="arrow-right" color={'#FFFFFF'} size={25} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 50,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '70%',
    paddingHorizontal: 20,
  },
  headerWidthButton: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  titlecontent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 40,
    marginVertical: 20,
  },
  logo: {
    width: '100%',
    height: 57,
    marginTop: 20,
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    borderRadius: 50,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    width: 237,
    height: 57,
    justifyContent: 'space-around',
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 21,
  },
  dateText: {
    // marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
    height: '100%',
    width: '100%',
    paddingTop: 5,
  },
  action: {
    flexDirection: 'column',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    backgroundColor: '#FFFFFF',
    width: 250,
    height: 60,
    paddingVer: 30,
    borderRadius: 4,
    alignItems: 'flex-start',
  },
  inputHeader: {
    fontSize: 12,
    color: '#828282',
    paddingTop: 8,
    paddingLeft: 12,
  },
  scrollView: {
    width: '100%',
  },
  nameInput: {
    marginBottom: 15,
  },
  dateBT: {
    color: 'black',
  },
});
