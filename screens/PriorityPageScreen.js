import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Feather';
import {Picker} from '@react-native-picker/picker';
import {useDispatch} from 'react-redux';
import {Controller, useForm} from 'react-hook-form';

const PriorityPageScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {control, handleSubmit} = useForm({
    defaultValues: {
      type1: '11',
      type2: '17',
    },
  });
  const submitFormHandler = handleSubmit(data => {
    let objKeys = Object.values(data);
    dispatch({type: 'INTERESTEDS_STEP_SUBMIT', payload: objKeys});
    navigation.navigate('CreatePasswordScreen');
  });
  return (
    <LinearGradient
      start={{x: 1, y: 1}}
      end={{x: 1, y: 0}}
      colors={['#D6AB6F', '#B8B8B8', '#674C31']}
      style={styles.linearGradient}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.content}>
        <View style={styles.headerWidthButton}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" color={'#FFFFFF'} size={45} />
          </TouchableOpacity>
          <View style={styles.titlecontent}>
            <Text style={styles.text}>Choose</Text>
            <Text style={styles.text}>priority</Text>
          </View>
          <View />
        </View>
        <View>
          <Animatable.Image
            animation="fadeInUpBig"
            duraton="1500"
            source={require('../assets/priority.png')}
            style={styles.logo}
            resizeMode="stretch"
          />
          <View style={styles.action}>
            <Text style={styles.inputHeader}>Type</Text>
            <Controller
              control={control}
              name="type1"
              render={({field: {onChange, value, onBlur}}) => {
                return (
                  <Picker
                    selectedValue={value}
                    style={styles.pickerSelectStyles}
                    onValueChange={onChange}
                    onBlur={onBlur}>
                    <Picker.Item label="Education / training" value="11" />
                    <Picker.Item
                      label="Healthcare / Pharmaceutical"
                      value="12"
                    />
                    <Picker.Item label="Construction" value="13" />
                    <Picker.Item label="Human Resources" value="14" />
                    <Picker.Item label="Sports" value="15" />
                    <Picker.Item
                      label="Procurement/Logistics/Courier"
                      value="16"
                    />
                  </Picker>
                );
              }}
            />
          </View>
          <View style={styles.action}>
            <Text style={styles.inputHeader}>Type Indigent</Text>
            <Controller
              control={control}
              name="type2"
              render={({field: {onChange, value, onBlur}}) => {
                return (
                  <Picker
                    selectedValue={value}
                    style={styles.pickerSelectStyles}
                    onValueChange={onChange}
                    onBlur={onBlur}>
                    <Picker.Item label="Beauty" value="17" />
                    <Picker.Item
                      label="Healthcare / Pharmaceutical"
                      value="12"
                    />
                    <Picker.Item label="Production" value="18" />
                    <Picker.Item label="Business / Management" value="19" />
                    <Picker.Item
                      label="Art / Design / Architecture"
                      value="20"
                    />
                    <Picker.Item
                      label="General / professional / Other services"
                      value="21"
                    />
                  </Picker>
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
    </LinearGradient>
  );
};

export default PriorityPageScreen;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
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
  },
  titlecontent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 40,
  },
  logo: {
    width: 245,
    height: 200,
  },
  icon: {
    paddingLeft: 10,
    bottom: 15,
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
  action: {
    flexDirection: 'column',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    alignItems: 'flex-start',
  },
  inputHeader: {
    fontSize: 12,
    color: '#828282',
    paddingTop: 10,
    paddingLeft: 12,
  },
  pickerSelectStyles: {
    width: '100%',
    color: 'black',
  },
  scrollView: {
    width: '100%',
  },
});
