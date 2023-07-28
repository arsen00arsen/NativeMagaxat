import React, {useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {SelectList} from 'react-native-dropdown-select-list';
import SafeAreaViewContainer from '../../Elements/SafeAreaViewContainer';
import GlobalStyles from '../../Configs/GlobalStyles';
import Text from '../../Elements/Text';
import Button from '../../Elements/Button';
import TextField from '../../Elements/TextField';
import {ScrollView} from 'react-native-gesture-handler';
import CustomDataPicker from '../../Elements/CustomDataPicker';
import ImagePicker from 'react-native-image-crop-picker';
import UserService from '../../http/Account/account';

const Registration = () => {
  const {control, handleSubmit, setValue} = useForm({});
  const [selectedImages, setSelectedImages] = React.useState([]);
  const [selected, setSelected] = React.useState('');
  const [categories, setCategories] = React.useState([]);
  const s = [
    {key: '1', value: 'Mobiles', disabled: true},
    {key: '2', value: 'Appliances'},
    {key: '3', value: 'Cameras'},
    {key: '4', value: 'Computers', disabled: true},
    {key: '5', value: 'Vegetables'},
    {key: '6', value: 'Diary Products'},
    {key: '7', value: 'Drinks'},
  ];
  const firsInputs = [
    {
      name: 'name',
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
      name: 'phone',
      control: control,
      placeholder: '+374',
      title: 'Telephone*',
    },
    {
      name: 'bio',
      control: control,
      placeholder: 'I love life...',
      title: 'Bio*',
    },

    {
      name: 'Sport, Dance...',
      control: control,
      placeholder: 'Sport, Dance...',
      title: 'Your Habits*',
    },
  ];
  useEffect(() => {
    getCategories();
    getCountry();
  }, []);
  const getCategories = async () => {
    try {
      const {data} = await UserService.getCategories();
      setCategories(data.data);
    } catch (err) {
      console.log(err, ';;');
    }
  };
  const getCountry = async () => {
    try {
      const {data} = await UserService.getCountry();
      console.log(data.data, 'country');
    } catch (err) {
      console.log(err, ';;');
    }
  };
  const pickImages = () => {
    ImagePicker.openPicker({
      multiple: false,
      includeBase64: true,
      width: 300,
      height: 400,
      cropping: true,
    }).then(images => {
      setSelectedImages([images]);
      setValue('avatar', 'data:image/jpeg;base64,' + images.data);
    });
  };
  const submitFormHandler = handleSubmit(async data => {
    try {
      const datas = await UserService.registre(data);
      console.log(datas);
    } catch (err) {
      console.log(err);
    }
  });
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
                {/* {categories.map((elem, index) => {
                  return ( */}
                <View>
                  <Text isSecondary hasMargin>
                    Select your gender*
                  </Text>

                  <SelectList
                    setSelected={val => setSelected(val)}
                    data={s}
                    save="value"
                  />
                </View>
                {/* );
                })} */}
              </View>
              <View>
                <TouchableOpacity onPress={pickImages} style={[styles.button]}>
                  <Image
                    source={require('../../../assets/icons/Upload.png')}
                    resizeMode="cover"
                    style={styles.iconImage}
                  />
                  <Text isBod style={{color: '#98A2B3', fontSize: 18}}>
                    Upload Photo
                  </Text>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                  {selectedImages.map((uri, index) => {
                    return (
                      <Image
                        key={index}
                        source={{uri: uri.sourceURL}}
                        style={styles.image}
                      />
                    );
                  })}
                </View>
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
                          style={[styles.textFiled]}
                          hasMargin
                          placeholder={elem.placeholder}
                          secureTextEntry={false}
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                        />
                        {_error?.message && <Text>{_error?.message}</Text>}
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
              onPress={submitFormHandler}>
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
    fontSize: 52,
  },
  text: {
    fontSize: 17,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#98A2B3',
    height: 80,
    borderRadius: 8,
    marginVertical: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textFiled: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#98A2B3',
  },
  boxStyle: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#98A2B3',
    marginTop: 5,
  },
  iconImage: {
    height: 25,
    width: 25,
    tintColor: '#98A2B3',
    marginRight: 10,
  },
});
