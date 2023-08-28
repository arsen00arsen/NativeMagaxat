import React from 'react';
import {StyleSheet, View, TouchableOpacity, Modal, Text} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Button from '../../Elements/Button';
import PostService from '../../http/Post/post';

const ModalComponent = ({modalVisible, setModalVisible, id}) => {
  const {t} = useTranslation();
  const [value, setValue] = React.useState('Other');

  const blockPost = async () => {
    try {
      const {data} = await PostService.blockPost(id);
    } catch (error) {
      console.log(error.response, ';;;;');
    } finally {
      setModalVisible(false);
    }
  };
  return (
    <View>
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.modal__overlay}>
            <View style={[styles.modalView, {backgroundColor: 'white'}]}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  flexDirection: 'row',
                }}>
                <AntDesign name="closecircleo" color={'black'} size={28} />
              </TouchableOpacity>
              <View style={{paddingTop: 5, width: 300}}>
                <Text
                  style={{
                    marginBottom: 30,
                    textAlign: 'center',
                    fontSize: 25,
                    fontWeight: '700',
                  }}>
                  {t('reportSender')}
                </Text>
                <RadioButton.Group
                  onValueChange={newValue => setValue(newValue)}
                  value={value}>
                  <>
                    <View style={styles.container}>
                      <Text
                        style={{
                          flex: 1,
                          flexWrap: 'wrap',
                          color: 'black',
                          paddingLeft: 10,
                        }}>
                        {t('reportHaked')}
                      </Text>
                      <View style={styles.onlyIos}>
                        <RadioButton value="My friend's account might be compromised or hacked" />
                      </View>
                    </View>
                    <View style={styles.container}>
                      <Text style={{color: 'black', paddingLeft: 10}}>
                        {t('reportHamful')}
                      </Text>
                      <View style={styles.onlyIos}>
                        <RadioButton value="Violence or harmful behavior" />
                      </View>
                    </View>
                    <View style={styles.container}>
                      <Text style={{color: 'black', paddingLeft: 10}}>
                        {t('reportHateSpeach')}
                      </Text>
                      <View style={styles.onlyIos}>
                        <RadioButton value="Hate speech" />
                      </View>
                    </View>
                    <View style={[styles.container, {marginBottom: 30}]}>
                      <Text style={{color: 'black', paddingLeft: 10}}>
                        {t('reportSexualiContent')}
                      </Text>
                      <View style={styles.onlyIos}>
                        <RadioButton value="Sexually explicit content" />
                      </View>
                    </View>
                  </>
                </RadioButton.Group>
                {/* {value === 'Other' ? (
                  <Controller
                    control={control}
                    name="message"
                    // rules={props.rules}
                    render={({
                      field: {onChange, value, onBlur},
                      fieldState: {error},
                    }) => {
                      return (
                        <>
                          <TextInput
                            placeholder=" ..."
                            style={styles.textInput}
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            multiline
                            underlineColorAndroid="white"
                          />
                          {error && (
                            <Text
                              style={{
                                color: 'red',
                                alignSelf: 'stretch',
                                width: 250,
                              }}>
                              {error.message || 'Error'}
                            </Text>
                          )}
                        </>
                      );
                    }}
                  />
                ) : null} */}
                <Button
                  // style={styles.requestButton}
                  onPress={blockPost}>
                  <Text style={{color: 'white', fontSize: 18}}>Block</Text>
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};
export default ModalComponent;
const styles = StyleSheet.create({
  modalView: {
    marginVertical: 250,
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
  },
  modal__overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    backgroundColor: '#000000e6',
  },
  container: {
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginVertical: 5,
  },
  textInput: {
    borderColor: '#E5E5E5',
    borderWidth: 1,
    borderRadius: 20,
    marginVertical: 15,
    marginHorizontal: 'auto',
    maxHeight: 150,
    width: '100%',
    color: 'black',
    fontSize: 16,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    maxWidth: 330,
    paddingVertical: 10,
  },

  onlyIos: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
    zIndex: 5,
    width: 35,
    height: 35,
  },

  requestButton: {
    width: '100%',
    height: 50,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
    borderRadius: 8,
  },
});
