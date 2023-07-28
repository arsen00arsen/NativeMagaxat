import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Controller} from 'react-hook-form';
import Text from './Text';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

const CustomDataPicker = ({control, title, name, setValue, rules}) => {
  const [open, setOpen] = useState(false);
  const [check, setCheck] = useState('');
  const [date, setDate] = useState(new Date());
  const [errors, setError] = useState('');

  return (
    <View>
      <Text isSecondary hasMargin>
        {title}
      </Text>
      <View
        style={[
          styles.dataPicker,
          errors === '' || check === 'dateChoose' ? null : styles.error,
        ]}>
        <TouchableOpacity
          style={{
            height: '140%',
            width: '100%',
            justifyContent: 'center',
          }}
          onPress={() => {
            setOpen(true);
            setCheck('dateChoose');
          }}>
          <Text isSecondary>{moment(date).format('DD.MM.YYYY')}</Text>
        </TouchableOpacity>
        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({field: {value, onChange, onBlur}, fieldState: {error}}) => {
            if (error) {
              setError(error.message);
            }
            return (
              <DatePicker
                mode="date"
                modal
                open={open}
                date={date}
                onConfirm={date => {
                  setOpen(false);
                  setDate(date);
                  setValue(name, moment(date).format('YYYY-MM-DD'));
                }}
                onCancel={() => {
                  setOpen(false), setCheck('');
                }}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

export default CustomDataPicker;
const styles = StyleSheet.create({
  dataPicker: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 15,
    fontStyle: 'normal',
    backgroundColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderColor: '#98A2B3',
    marginTop: 5,
  },
});
