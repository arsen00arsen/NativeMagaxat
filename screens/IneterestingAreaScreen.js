import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import {Picker} from '@react-native-picker/picker';
import {useDispatch} from 'react-redux';
import {Controller, useForm} from 'react-hook-form';

const IneterestingAreaScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {control, handleSubmit} = useForm({
    defaultValues: {
      type1: '1',
      type2: '5',
      type3: '8',
    },
  });
  const submitFormHandler = handleSubmit(data => {
    let objKeys = Object.values(data);
    dispatch({type: 'INTERESTEDS_STEP_SUBMIT', payload: objKeys});
    navigation.navigate('PriorityPageScreen');
  });
  return (
    <LinearGradient
      start={{x: 1, y: 1}}
      end={{x: 1, y: 0}}
      colors={['#D6AB6F', '#B8B8B8', '#674C31']}
      style={styles.linearGradient}>
      <StatusBar backgroundColor="#674C31" barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.headerWidthButton}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="chevron-left" color={'#FFFFFF'} size={45} />
            </TouchableOpacity>
            <View style={styles.titlecontent}>
              <Text style={styles.text}>Your 3 most</Text>
              <Text style={styles.text}>interesting areas</Text>
            </View>
            <View />
          </View>
          <Animatable.Image
            animation="fadeInUpBig"
            duraton="1500"
            source={require('../assets/interesting.png')}
            style={styles.logo}
            resizeMode="stretch"
          />
          {Platform.OS === 'ios' ? (
            <View style={{width: '80%'}}>
              <View style={styles.actionIOS}>
                <Text style={styles.inputHeader}>Interest #1</Text>
                <Controller
                  control={control}
                  name="type1"
                  render={({field: {onChange, value, onBlur}}) => {
                    return (
                      <Picker
                        selectedValue={value}
                        itemStyle={{fontSize: 13, height: 100}}
                        onValueChange={onChange}
                        onBlur={onBlur}>
                        <Picker.Item label="Education / training" value="1" />
                        <Picker.Item
                          label="Sales / service management"
                          value="2"
                        />
                        <Picker.Item
                          label="Administrative / office-work"
                          value="3"
                        />
                        <Picker.Item
                          label="Tourism / Hospitality / HoReCa"
                          value="4"
                        />
                      </Picker>
                    );
                  }}
                />
              </View>
              <View style={styles.actionIOS}>
                <Text style={styles.inputHeader}>Interest #2</Text>
                <Controller
                  control={control}
                  name="type2"
                  render={({field: {onChange, value, onBlur}}) => {
                    return (
                      <Picker
                        selectedValue={value}
                        itemStyle={{fontSize: 13, height: 100}}
                        onValueChange={onChange}
                        onBlur={onBlur}>
                        <Picker.Item
                          label="Marketing / Advertising"
                          value="5"
                        />
                        <Picker.Item
                          label="Communications / Journalism / PR"
                          value="6"
                        />
                        <Picker.Item
                          label="Accounting / Bookkeeping / Cash register"
                          value="7"
                        />
                      </Picker>
                    );
                  }}
                />
              </View>
              <View style={styles.actionIOS}>
                <Text style={styles.inputHeader}>Interest #3</Text>
                <Controller
                  control={control}
                  name="type3"
                  render={({field: {onChange, value, onBlur}}) => {
                    return (
                      <Picker
                        selectedValue={value}
                        style={styles.pickerSelectStyles}
                        onValueChange={onChange}
                        itemStyle={{fontSize: 13, height: 100}}
                        onBlur={onBlur}>
                        <Picker.Item label="Finance Management" value="8" />
                        <Picker.Item label="Banking / credit" value="9" />
                        <Picker.Item label="Audit / Compliance" value="10" />
                      </Picker>
                    );
                  }}
                />
              </View>
            </View>
          ) : (
            <View style={styles.actionbody}>
              <View style={styles.action}>
                <Text style={styles.inputHeader}>Interest #1</Text>
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
                        <Picker.Item label="Education / training" value="1" />
                        <Picker.Item
                          label="Sales / service management"
                          value="2"
                        />
                        <Picker.Item
                          label="Administrative / office-work"
                          value="3"
                        />
                        <Picker.Item
                          label="Tourism / Hospitality / HoReCa"
                          value="4"
                        />
                      </Picker>
                    );
                  }}
                />
              </View>
              <View style={styles.action}>
                <Text style={styles.inputHeader}>Interest #2</Text>
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
                        <Picker.Item
                          label="Marketing / Advertising"
                          value="5"
                        />
                        <Picker.Item
                          label="Communications / Journalism / PR"
                          value="6"
                        />
                        <Picker.Item
                          label="Accounting / Bookkeeping / Cash register"
                          value="7"
                        />
                      </Picker>
                    );
                  }}
                />
              </View>
              <View style={styles.action}>
                <Text style={styles.inputHeader}>Interest #3</Text>
                <Controller
                  control={control}
                  name="type3"
                  render={({field: {onChange, value, onBlur}}) => {
                    return (
                      <Picker
                        selectedValue={value}
                        style={styles.pickerSelectStyles}
                        onValueChange={onChange}
                        onBlur={onBlur}>
                        <Picker.Item label="Finance Management" value="8" />
                        <Picker.Item label="Banking / credit" value="9" />
                        <Picker.Item label="Audit / Compliance" value="10" />
                      </Picker>
                    );
                  }}
                />
              </View>
            </View>
          )}

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

export default IneterestingAreaScreen;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 50,
  },
  scrollView: {
    width: '100%',
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
  },
  logo: {
    width: 160,
    height: 191,
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
    paddingTop: 5,
    paddingLeft: 12,
  },
  pickerSelectStyles: {
    width: '100%',
    flex: 1,
    color: 'black',
  },
  actionbody: {
    width: 250,
  },
  actionIOS: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 20,
  },
});
