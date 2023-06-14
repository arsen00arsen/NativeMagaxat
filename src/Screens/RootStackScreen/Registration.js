import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {SelectList} from 'react-native-dropdown-select-list';
import SafeAreaViewContainer from '../../Elements/SafeAreaViewContainer';
import GlobalStyles from '../../Configs/GlobalStyles';
import Text from '../../Elements/Text';
import Button from '../../Elements/Button';
import TextField from '../../Elements/TextField';
import {ScrollView} from 'react-native-gesture-handler';
import CustomDataPicker from '../../Elements/CustomDataPicker';

const Registration = () => {
  const {control, handleSubmit, setValue} = useForm({});
  const [selected, setSelected] = React.useState('');
  const selectedData = [
    [
      {key: 1, value: 'Female'},
      {key: 2, value: 'Male'},
      {key: 3, value: 'Custom'},
    ],
    [{key: 1, value: 'Armenia'}],
  ];
  const firsInputs = [
    {
      name: 'first_name',
      control: control,
      placeholder: 'Name',
      title: 'Your First Name*',
    },
    {
      name: 'last_name',
      control: control,
      placeholder: 'Last name',
      title: 'Your Last Name*',
    },
    {
      name: 'email',
      control: control,
      placeholder: 'Email',
      title: 'Your Email Address*',
    },
  ];
  const secondInputs = [
    {
      name: 'education',
      control: control,
      placeholder: 'Education',
      title: 'Your Education*',
    },
    {
      name: 'profession',
      control: control,
      placeholder: 'Profession',
      title: 'Profession*',
    },
    {
      name: 'telephone',
      control: control,
      placeholder: '+374',
      title: 'Telephone*',
    },
  ];
  return (
    <View style={styles.container}>
      <SafeAreaViewContainer>
        <ScrollView>
          <View
            style={[
              GlobalStyles.main__container,
              {
                justifyContent: 'space-between',
              },
            ]}>
            <Text isHeadingTitle style={{color: '#ED7B12'}} isBold>
              Hello Champion!
            </Text>
            <View>
              {firsInputs.map((elem, index) => {
                return (
                  <Controller
                    key={index}
                    control={elem.control}
                    name={elem.name}
                    render={({
                      field: {value, onChange, onBlur},
                      fieldState: {error: _error},
                    }) => (
                      <View>
                        <Text isSecondary hasMargin>
                          {elem.title}
                        </Text>
                        <TextField
                          style={[
                            {
                              backgroundColor: '#fff',
                              borderWidth: 1,
                              borderColor: '#98A2B3',
                            },
                          ]}
                          hasMargin
                          placeholder={elem.placeholder}
                          secureTextEntry={false}
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                        />
                        {_error?.message && (
                          <Text style={{color: 'red'}}>{_error?.message}</Text>
                        )}
                      </View>
                    )}
                  />
                );
              })}
              <View>
                {selectedData.map((elem, index) => {
                  return (
                    <View key={index}>
                      <Text isSecondary hasMargin>
                        Select your gender*
                      </Text>
                      <SelectList
                        setSelected={val => setSelected(val)}
                        boxStyles={{
                          backgroundColor: '#fff',
                          borderWidth: 1,
                          borderColor: '#98A2B3',
                          marginTop: 5,
                        }}
                        defaultOption={{key: elem[0].key, value: elem[0].value}}
                        data={elem}
                        save="value"
                      />
                    </View>
                  );
                })}
              </View>
              {secondInputs.map((elem, index) => {
                return (
                  <Controller
                    key={index}
                    control={elem.control}
                    name={elem.name}
                    render={({
                      field: {value, onChange, onBlur},
                      fieldState: {error: _error},
                    }) => (
                      <View>
                        <Text isSecondary hasMargin>
                          {elem.title}
                        </Text>
                        <TextField
                          style={[
                            {
                              backgroundColor: '#fff',
                              borderWidth: 1,
                              borderColor: '#98A2B3',
                            },
                          ]}
                          hasMargin
                          placeholder={elem.placeholder}
                          secureTextEntry={false}
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                        />
                        {_error?.message && (
                          <Text style={{color: 'red'}}>{_error?.message}</Text>
                        )}
                      </View>
                    )}
                  />
                );
              })}
              <CustomDataPicker
                title="What is your date of birth?*"
                control={control}
                name="date_of_issue"
                setValue={setValue}
              />
            </View>
            <Button
              style={{marginTop: 30, marginBottom: 10}}
              onPress={() => console.log('Registration')}>
              <Text isWhite isBold>
                Create Account
              </Text>
            </Button>
          </View>
        </ScrollView>
      </SafeAreaViewContainer>
    </View>
  );
};

export default Registration;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  title: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 32,
    color: 'white',
  },
  subtitle: {
    // fontFamily: 'SF-Pro-Display-Bold',
    fontSize: 52,
  },
  text: {
    fontSize: 17,
  },
});
