import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
  TextInput,
} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import SafeAreaViewContainer from '../../../Elements/SafeAreaViewContainer';
import GlobalStyles from '../../../Configs/GlobalStyles';
import Text from '../../../Elements/Text';
import Button from '../../../Elements/Button';
import TextField from '../../../Elements/TextField';
import ImagePicker from 'react-native-image-crop-picker';
import Video from 'react-native-video';
import UserService from '../../../http/Account/account';
import {MultipleSelectList} from 'react-native-dropdown-select-list';
import CustomDataPicker from '../../../Elements/CustomDataPicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from '../../../Elements/Icon';
import {black} from 'react-native-paper/lib/typescript/styles/colors';
const Name_Surname_Regex = /^(?=.{3,20}$)/i;

const AddPost = ({navigation}) => {
  const {control, handleSubmit, setValue} = useForm({});
  const [selectedImages, setSelectedImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imagess, setImages] = useState();
  const [selected, setSelected] = useState([]);
  const modifiedArray = selected.map(id => ({id}));
  const firsInputs = [
    {
      name: 'title',
      control: control,
      placeholder: 'Title',
      title: 'Title*',
      rules: {
        required: 'This field is required',
        pattern: {
          value: Name_Surname_Regex,
          message: 'This field is required',
        },
      },
    },
    {
      name: 'role',
      control: control,
      placeholder:
        "Allows the moderator to specify their role or position within the app's community.",
      title: 'Role',
      rules: {
        required: 'This field is required',
        pattern: {
          value: Name_Surname_Regex,
          message: 'This field is required',
        },
      },
    },
    {
      name: 'group_or_single',
      control: control,
      placeholder: 'Are you working on a project in a group or alone?',
      title: 'Group or Single',
      rules: {
        required: 'This field is required',
        pattern: {
          value: Name_Surname_Regex,
          message: 'This field is required',
        },
      },
    },
  ];
  const secondInputs = [
    {
      name: 'url',
      control: control,
      placeholder: 'Add Link',
      title: 'Social Media Link (preferably Linkedin)*',
      rules: {
        required: 'This field is required',
        minLenght: {
          value: 1,
          message: 'This field is required',
        },
      },
    },
    {
      name: 'description',
      control: control,
      placeholder:
        'Let people know about your work, creativity & inspiration about this work',
      title: 'Description*',
      rules: {
        required: 'This field is required',
        minLenght: {
          value: 1,
          message: 'This field is required',
        },
      },
    },
    {
      name: 'price',
      control: control,
      placeholder: 'Enter ETH amount',
      title: 'Price*',
      rules: {
        required: 'This field is required',
        pattern: {
          value: Name_Surname_Regex,
          message: 'This field is required',
        },
      },
    },
  ];
  useEffect(() => {
    getCategories();
  }, []);
  const getCategories = async () => {
    try {
      const {data} = await UserService.getCategories();
      setCategories(data.data);
    } catch (err) {}
  };

  const submitFormHandler = handleSubmit(async datas => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      datas.categories = modifiedArray;
      const formData = new FormData();
      imagess.forEach((image, index) => {
        const fileCustom = {
          uri: image.path,
          name: image.filename || `image_${index}.jpg`,
          type: image.mime,
        };
        formData.append(`files[${index}]`, fileCustom);
      });
      for (const key in datas) {
        if (Object.hasOwnProperty.call(datas, key)) {
          if (key === 'categories') {
            datas[key].forEach((category, index) => {
              formData.append(`${key}[${index}][id]`, category.id);
            });
          } else {
            formData.append(key, datas[key]);
          }
        }
      }
      const response = await fetch('http://167.71.7.108/api/post', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message); // Throw an error with the error message from the response
      } else {
        // Alert.alert('Succes');
        navigation.navigate('AddedPost');
      }
    } catch (error) {
      Alert.alert(error.message);
    } finally {
      setLoading(false);
    }
  });

  const pickImages = async () => {
    const images = await ImagePicker.openPicker({
      mediaType: 'any',
      multiple: true,
    });
    setSelectedImages(images);
    setImages(images);
  };
  const handleImageClick = index => {
    const newSelectedImages = [...selectedImages];
    newSelectedImages.splice(index, 1);
    setSelectedImages(newSelectedImages);
  };
  const [inputValue, setInputValue] = useState('');
  const [inputHeight, setInputHeight] = useState(40);

  const handleContentSizeChange = (contentWidth, contentHeight) => {
    setInputHeight(contentHeight + 10); // Add some padding
  };
  if (loading) {
    return <ActivityIndicator size="large" style={styles.loading} />;
  }
  return (
    <View style={styles.container}>
      <SafeAreaViewContainer>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <ScrollView>
            <View
              style={[
                GlobalStyles.main__container,
                {
                  justifyContent: 'space-between',
                },
              ]}>
              <View>
                {firsInputs.map((elem, index) => {
                  return (
                    <Controller
                      key={index}
                      control={elem.control}
                      name={elem.name}
                      rules={elem.rules}
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
                            <Text isError>{_error?.message}</Text>
                          )}
                        </View>
                      )}
                    />
                  );
                })}
                <View>
                  <TouchableOpacity
                    onPress={pickImages}
                    style={[
                      {
                        backgroundColor: '#fff',
                        borderWidth: 1,
                        borderColor: '#98A2B3',
                        height: 150,
                        borderRadius: 8,
                        marginVertical: 30,
                        alignItems: 'center',
                        justifyContent: 'center',
                      },
                    ]}>
                    <Text hasMargin>Upload Photo/Video</Text>
                  </TouchableOpacity>
                  <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    {selectedImages.map((uri, index) => {
                      return (
                        <View key={index}>
                          {uri.mime.includes('image') ? (
                            <Image
                              source={{uri: uri.sourceURL}}
                              style={styles.imageVideo}
                            />
                          ) : (
                            <Video
                              source={{uri: uri.sourceURL}}
                              paused={true}
                              resizeMode={'cover'}
                              style={styles.imageVideo}
                              repeat={false}
                            />
                          )}
                          <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => handleImageClick(index)}>
                            <Icon
                              // isPrimary
                              useAntDesign
                              name="delete"
                              size={20}
                            />
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                  </View>
                  <CustomDataPicker
                    title="Duration*"
                    control={control}
                    name="duration"
                    rules={{required: 'This field is required'}}
                    setValue={setValue}
                  />
                </View>
                <View>
                  <Text isSecondary hasMargin style={{paddingBottom: 10}}>
                    Your Habits*
                  </Text>
                  <MultipleSelectList
                    setSelected={val => setSelected(val)}
                    multiple={true}
                    data={categories}
                    save="name"
                  />
                </View>
                {secondInputs.map((elem, index) => {
                  return (
                    <Controller
                      key={index}
                      control={elem.control}
                      name={elem.name}
                      rules={elem.rules}
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
                            <Text isError>{_error?.message}</Text>
                          )}
                        </View>
                      )}
                    />
                  );
                })}
                {/* <View style={styles.container2}> */}
                {/* <TextInput
                  style={[styles.textInput, {height: inputHeight}]}
                  placeholder="Type here..."
                  multiline={true}
                  value={inputValue}
                  onChangeText={text => setInputValue(text)}
                  onContentSizeChange={e =>
                    handleContentSizeChange(
                      e.nativeEvent.contentSize.width,
                      e.nativeEvent.contentSize.height,
                    )
                  }
                /> */}
                {/* </View> */}
              </View>
              <Button
                style={{marginTop: 30, marginBottom: 100}}
                onPress={submitFormHandler}>
                <Text isWhite isBold>
                  Create Post
                </Text>
              </Button>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaViewContainer>
    </View>
  );
};

export default AddPost;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: 'white',
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
  },
  subtitle: {
    fontSize: 52,
  },
  text: {
    fontSize: 17,
  },
  loading: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageVideo: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
    marginLeft: 5,
  },
  deleteButton: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: '#4F48EC',
    padding: 5,
    right: 0,
    borderRadius: 15,
    backgroundColor: '#4F48EC',
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  textInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 8,
    fontSize: 16,
  },
});
