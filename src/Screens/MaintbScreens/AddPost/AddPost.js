import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import SafeAreaViewContainer from '../../../Elements/SafeAreaViewContainer';
import GlobalStyles from '../../../Configs/GlobalStyles';
import Text from '../../../Elements/Text';
import Button from '../../../Elements/Button';
import TextField from '../../../Elements/TextField';
import ImagePicker from 'react-native-image-crop-picker';

const AddPost = () => {
  const {control, handleSubmit, setValue} = useForm({});
  const [selectedImages, setSelectedImages] = React.useState([]);

  const firsInputs = [
    {
      name: 'title',
      control: control,
      placeholder: 'Title',
      title: 'Title*',
    },
    {
      name: 'role',
      control: control,
      placeholder:
        "Allows the moderator to specify their role or position within the app's community.",
      title: 'Role',
    },
    {
      name: 'Group_or_Single',
      control: control,
      placeholder: 'Are you working on a project in a group or alone?',
      title: 'Group or Single',
    },
  ];
  const secondInputs = [
    {
      name: 'social_media',
      control: control,
      placeholder: 'Add Link',
      title: 'Social Media Link (preferably Linkedin)*',
    },
    {
      name: 'categories',
      control: control,
      placeholder: 'Sport ...',
      title: 'Categories*',
    },
    {
      name: 'description',
      control: control,
      placeholder:
        'Let people know about your work, creativity & inspiration about this work',
      title: 'Description*',
    },
    {
      name: 'duration',
      control: control,
      placeholder: 'Time',
      title: 'Duration*',
    },
    {
      name: 'Price',
      control: control,
      placeholder: 'Enter ETH amount',
      title: 'Price*',
    },
  ];

  const pickImages = () => {
    ImagePicker.openPicker({
      multiple: true,
    }).then(images => {
      setSelectedImages(images);
    });
  };

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
                        {_error?.message && <Text>{_error?.message}</Text>}
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
                  <Text>Upload Photo/Video</Text>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                  {selectedImages.map((uri, index) => {
                    return (
                      <Image
                        key={index}
                        source={{uri: uri.sourceURL}}
                        style={{
                          width: 100,
                          height: 100,
                          borderRadius: 10,
                          marginRight: 10,
                        }}
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
                        {_error?.message && <Text>{_error?.message}</Text>}
                      </View>
                    )}
                  />
                );
              })}
            </View>
            <Button
              style={{marginTop: 30, marginBottom: 100}}
              onPress={() => console.log('Registration')}>
              <Text isWhite isBold>
                Create Post
              </Text>
            </Button>
          </View>
        </ScrollView>
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
    color: 'white',
  },
  subtitle: {
    fontSize: 52,
  },
  text: {
    fontSize: 17,
  },
});
