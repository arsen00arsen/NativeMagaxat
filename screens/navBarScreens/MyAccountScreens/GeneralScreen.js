import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import HeaderBackSearch from '../../../components/HeaderComponents/HeaderBackSearch';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/Feather';
import MyaccountUsserInforAvatar from '../../../components/MyaccountUsserInforAvatar';

const GeneralScreen = ({navigation}) => {
  const theme = useTheme();
  const [data, setData] = React.useState({
    name: '',
    lastName: '',
    date: '',
    email: '',
    phone: '',
    ineterstingAreas: '',
    ineterstingArea1: '',
    ineterstingArea2: '',
    ineterstingArea3: '',
    ineterstingArea4: '',
    ineterstingArea5: '',
  });

  const inputChange = ({val, nameInput}) => {
    if (nameInput == 'name') {
      setData({
        ...data,
        name: val,
      });
    } else if (nameInput == 'lastName') {
      setData({
        ...data,
        lastName: val,
      });
    } else if (nameInput == 'date') {
      setData({
        ...data,
        date: val,
      });
    } else if (nameInput == 'email') {
      setData({
        ...data,
        email: val,
      });
    } else if (nameInput == 'phone') {
      setData({
        ...data,
        phone: val,
      });
    } else if (nameInput == 'ineterstingArea1') {
      setData({
        ...data,
        ineterstingArea1: val,
      });
    } else if (nameInput == 'ineterstingAreas') {
      setData({
        ...data,
        ineterstingAreas: val,
      });
    } else if (nameInput == 'ineterstingArea2') {
      setData({
        ...data,
        ineterstingArea2: val,
      });
    } else if (nameInput == 'ineterstingArea3') {
      setData({
        ...data,
        ineterstingArea3: val,
      });
    } else if (nameInput == 'ineterstingArea4') {
      setData({
        ...data,
        ineterstingArea4: val,
      });
    } else if (nameInput == 'ineterstingArea5') {
      setData({
        ...data,
        ineterstingArea5: val,
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#009387"
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      <HeaderBackSearch />
      <ScrollView showsVerticalScrollIndicator={false} style={{width: '100%'}}>
        <MyaccountUsserInforAvatar />
        <View style={styles.action}>
          <Text style={styles.inputHeader}>Name</Text>
          <TextInput
            placeholderTextColor="#666666"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={val => inputChange({val, nameInput: 'name'})}
            placeholder="User Name"
          />
        </View>
        <View style={styles.action}>
          <Text style={styles.inputHeader}>Last Name</Text>
          <TextInput
            placeholderTextColor="#666666"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={val => inputChange({val, nameInput: 'lastName'})}
            placeholder="User Last Name"
          />
        </View>
        <View style={styles.action}>
          <Text style={styles.inputHeader}>Date</Text>
          <TextInput
            placeholderTextColor="#666666"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={val => inputChange({val, nameInput: 'date'})}
            placeholder="User Date"
          />
        </View>
        <View style={styles.action}>
          <Text style={styles.inputHeader}>E-mail</Text>
          <TextInput
            placeholderTextColor="#666666"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={val => inputChange({val, nameInput: 'email'})}
            placeholder="User E-mail"
          />
        </View>
        <View style={styles.action}>
          <Text style={styles.inputHeader}>Phone Number</Text>
          <TextInput
            placeholderTextColor="#666666"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={val => inputChange({val, nameInput: 'phone'})}
            placeholder="User Phone Number"
          />
        </View>
        <View style={styles.action}>
          <Text style={styles.inputHeader}>Interested areas</Text>
          <RNPickerSelect
            placeholder={{label: '', value: 'Interested areas'}}
            useNativeAndroidPickerStyle={false}
            style={{
              ...pickerSelectStyles,
              iconContainer: {
                top: 10,
                right: 20,
              },
            }}
            onValueChange={value =>
              inputChange({value, nameInput: 'ineterstingAreas'})
            }
            items={[
              {label: 'It', value: 'it'},
              {label: 'Footbole', value: 'footbole'},
            ]}
            Icon={() => {
              return (
                <Icon
                  name="chevron-down"
                  size={18}
                  color="#909090"
                  style={styles.icon}
                />
              );
            }}
          />
        </View>
        <View style={styles.action}>
          <Text style={styles.inputHeader}>Interesting Area 1</Text>
          <RNPickerSelect
            placeholder={{label: '', value: 'Interesting Area 1'}}
            useNativeAndroidPickerStyle={false}
            style={{
              ...pickerSelectStyles,
              iconContainer: {
                top: 10,
                right: 20,
              },
            }}
            onValueChange={value =>
              inputChange({value, nameInput: 'ineterstingArea1'})
            }
            items={[
              {label: 'It', value: 'it'},
              {label: 'Footbole', value: 'footbole'},
            ]}
            Icon={() => {
              return (
                <Icon
                  name="chevron-down"
                  size={18}
                  color="#909090"
                  style={styles.icon}
                />
              );
            }}
          />
        </View>
        <View style={styles.action}>
          <Text style={styles.inputHeader}>Interesting Area 2</Text>
          <RNPickerSelect
            placeholder={{label: '', value: 'Interesting Area 2'}}
            useNativeAndroidPickerStyle={false}
            style={{
              ...pickerSelectStyles,
              iconContainer: {
                top: 10,
                right: 20,
              },
            }}
            onValueChange={value =>
              inputChange({value, nameInput: 'ineterstingArea2'})
            }
            items={[
              {label: 'It', value: 'it'},
              {label: 'Footbole', value: 'footbole'},
            ]}
            Icon={() => {
              return (
                <Icon
                  name="chevron-down"
                  size={18}
                  color="#909090"
                  style={styles.icon}
                />
              );
            }}
          />
        </View>
        <View style={styles.action}>
          <Text style={styles.inputHeader}>Interesting Area 3</Text>
          <RNPickerSelect
            placeholder={{label: '', value: 'Interesting Area 3'}}
            useNativeAndroidPickerStyle={false}
            style={{
              ...pickerSelectStyles,
              iconContainer: {
                top: 10,
                right: 20,
              },
            }}
            onValueChange={value =>
              inputChange({value, nameInput: 'ineterstingArea3'})
            }
            items={[
              {label: 'It', value: 'it'},
              {label: 'Footbole', value: 'footbole'},
            ]}
            Icon={() => {
              return (
                <Icon
                  name="chevron-down"
                  size={18}
                  color="#909090"
                  style={styles.icon}
                />
              );
            }}
          />
        </View>
        <View style={styles.action}>
          <Text style={styles.inputHeader}>Interesting Area 4</Text>
          <RNPickerSelect
            placeholder={{label: '', value: 'Interesting Area 4'}}
            useNativeAndroidPickerStyle={false}
            style={{
              ...pickerSelectStyles,
              iconContainer: {
                top: 10,
                right: 20,
              },
            }}
            onValueChange={value =>
              inputChange({value, nameInput: 'ineterstingArea4'})
            }
            items={[
              {label: 'It', value: 'it'},
              {label: 'Footbole', value: 'footbole'},
            ]}
            Icon={() => {
              return (
                <Icon
                  name="chevron-down"
                  size={18}
                  color="#909090"
                  style={styles.icon}
                />
              );
            }}
          />
        </View>
        <View style={styles.action}>
          <Text style={styles.inputHeader}>Interesting Area 5</Text>
          <RNPickerSelect
            placeholder={{label: '', value: 'Interesting Area 5'}}
            useNativeAndroidPickerStyle={false}
            style={{
              ...pickerSelectStyles,
              iconContainer: {
                top: 10,
                right: 20,
              },
            }}
            onValueChange={value =>
              inputChange({value, nameInput: 'ineterstingArea5'})
            }
            items={[
              {label: 'It', value: 'it'},
              {label: 'Footbole', value: 'footbole'},
            ]}
            Icon={() => {
              return (
                <Icon
                  name="chevron-down"
                  size={18}
                  color="#909090"
                  style={styles.icon}
                />
              );
            }}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log('AccounProfiletScreen')}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default GeneralScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
    paddingTop: 15,
    backgroundColor: '#F2F2F2',
    height: '100%',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingLeft: 10,
    color: 'black',
    height: '100%',
    width: '100%',
    borderRadius: 8,
    fontSize: 14,
    fontWeight: '700',
  },
  action: {
    flexDirection: 'column',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: 60,
    borderRadius: 8,
    alignItems: 'flex-start',
  },
  inputHeader: {
    fontSize: 12,
    color: '#828282',
    paddingTop: 7,
    paddingLeft: 12,
  },
  icon: {
    paddingLeft: 10,
    bottom: 15,
  },
  button: {
    width: '100%',
    height: 60,
    borderRadius: 8,
    backgroundColor: '#BB9E79',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    paddingHorizontal: 12,
    color: 'black',
    fontWeight: '700',
    fontSize: 16,
    paddingVertical: 8,
    bottom: 5,
    minWidth: 350,
  },
});
