import * as React from 'react';
import {RadioButton, Text} from 'react-native-paper';
import {View, StyleSheet, TextInput} from 'react-native';
import {useDispatch} from 'react-redux';
import {Controller} from 'react-hook-form';
import {useTranslation} from 'react-i18next';

const ChechBox = props => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('Other');
  dispatch({type: 'REPORT_INFO', payload: value});
  return (
    <View style={{paddingTop: 5}}>
      <Text
        style={{
          marginVertical: 50,
          textAlign: 'center',
          fontSize: 25,
          fontWeight: '700',
        }}>
        {t('reportSender')}
      </Text>
      <RadioButton.Group
        onValueChange={newValue => setValue(newValue)}
        value={value}>
        {props?.types === 'user' ? null : (
          <>
            <View style={styles.container}>
              <Text
                style={{
                  flex: 1,
                  flexWrap: 'wrap',
                  color: 'silver',
                  paddingLeft: 10,
                }}>
                {t('reportHaked')}
              </Text>
              <View style={styles.onlyIos}>
                <RadioButton value="My friend's account might be compromised or hacked" />
              </View>
            </View>
            <View style={styles.container}>
              <Text style={{color: 'silver', paddingLeft: 10}}>
                {t('reportHamful')}
              </Text>
              <View style={styles.onlyIos}>
                <RadioButton value="Violence or harmful behavior" />
              </View>
            </View>
            <View style={styles.container}>
              <Text style={{color: 'silver', paddingLeft: 10}}>
                {t('reportHateSpeach')}
              </Text>
              <View style={styles.onlyIos}>
                <RadioButton value="Hate speech" />
              </View>
            </View>
            <View style={styles.container}>
              <Text style={{color: 'silver', paddingLeft: 10}}>
                {t('reportSexualiContent')}
              </Text>
              <View style={styles.onlyIos}>
                <RadioButton value="Sexually explicit content" />
              </View>
            </View>
          </>
        )}
        <View style={styles.container}>
          <Text style={{color: 'silver', paddingLeft: 10}}>
            {t('reportOther')}
          </Text>
          <View style={styles.onlyIos}>
            <RadioButton value="Other" />
          </View>
        </View>
      </RadioButton.Group>
      {value === 'Other' ? (
        <Controller
          control={props.control}
          name="message"
          rules={props.rules}
          render={({field: {onChange, value, onBlur}, fieldState: {error}}) => {
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
                    style={{color: 'red', alignSelf: 'stretch', width: 250}}>
                    {error.message || 'Error'}
                  </Text>
                )}
              </>
            );
          }}
        />
      ) : null}
    </View>
  );
};

export default ChechBox;

const styles = StyleSheet.create({
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
    borderColor: 'silver',
    borderRadius: 50,
    zIndex: 5,
  },
});
