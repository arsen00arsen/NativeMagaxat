import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
// import CountryCodeList from '../components/CountryCodeList';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Picker} from '@react-native-picker/picker';
import {useSelector, useDispatch} from 'react-redux';
import {baseUrl2} from '../http/index';
import CountryCodeList from '../components/CountryCodeList';
const LocationPageScreen = ({navigation}) => {
  const [selectedInter, setSselectedInter] = React.useState('');
  const [countrySelect, setCountrySelect] = React.useState('');
  const name = useSelector(state => state.usser);
  const dispatch = useDispatch();

  let change = async () => {
    let dataObjects = Object.assign(
      name.usserDatNLnames,
      name.userEmailPhone,
      name.usserDateLocation,
      name.usserDatePassword,
      // name.userInterested1,
      // name.userInterested2,
      // name.userInterested3,
      // name.userInterestedType,
      // name.userInterestedTypeIndigent,
      // name.userDateGender,
      // name.usserDatDate,
    );
    console.log(dataObjects, 'dataObjects');
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(dataObjects),
    };
    fetch(baseUrl2 + '/register', requestOptions)
      .then(response => response.json())
      .then(data => console.log(data));
  };
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
            <Text style={styles.text}>Choose priority</Text>
          </View>
          <View />
        </View>
        <View style={styles.inputSIcon}>
          <Animatable.Image
            animation="fadeInUpBig"
            duraton="1500"
            source={require('../assets/Location.png')}
            style={styles.logo}
            resizeMode="stretch"
          />
          {/* <View style={styles.actionLocal}>
            <Text style={styles.inputHeaderLocation}>Location</Text>
            <Picker
              selectedValue={countrySelect}
              style={styles.pickerSelectStyles}
              onValueChange={(itemValues, itemIndex) => {
                setCountrySelect(itemValues);
                dispatch({
                  type: 'USSER_SIGN_UPLOCATION',
                  payload: {country: itemValues},
                });
              }}>
              <Picker.Item label="Armenia" value={1} />
              <Picker.Item label="Russia" value={2} />
              <Picker.Item label="US" value={3} />
            </Picker>
          </View> */}
          <>
            <CountryCodeList />
          </>
          <View style={styles.action}>
            <Text style={styles.inputHeader}>Language</Text>
            <Picker
              selectedValue={selectedInter}
              style={styles.pickerSelectStyles}
              onValueChange={(itemValue, itemIndex) => {
                setSselectedInter(itemValue);
                dispatch({
                  type: 'USSER_SIGN_UP_LANGUEGE',
                  payload: {usserLanguage: itemValue},
                });
              }}>
              <Picker.Item label="English" value="3" />
              <Picker.Item label="Armenian" value="2" />
              <Picker.Item label="Russian" value="1" />
            </Picker>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.signIn}>
            <LinearGradient
              colors={['#88673A', '#3C3835']}
              style={styles.signIn}>
              <Text style={styles.textSign}>Log In</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.startButton} onPress={change}>
            <Text style={styles.textStartButton}>Start</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default LocationPageScreen;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
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
  inputSIcon: {
    display: 'flex',
    alignItems: 'center',
  },
  titlecontent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 30,
    marginRight: 40,
  },
  logo: {
    width: 193,
    height: 160,
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
    justifyContent: 'space-sround',
  },
  arrowIcon: {
    marginRight: 20,
  },
  action: {
    flexDirection: 'column',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    backgroundColor: '#FFFFFF',
    width: 250,
    height: 60,
    borderRadius: 4,
    alignItems: 'flex-start',
  },
  actionLocal: {
    flexDirection: 'column',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#8A8A8A',
    backgroundColor: '#8A8A8A',
    width: 250,
    height: 60,
    borderRadius: 4,
    alignItems: 'flex-start',
    color: 'red',
  },
  inputHeader: {
    fontSize: 12,
    color: '#828282',
    paddingTop: 10,
    paddingLeft: 12,
  },
  inputHeaderLocation: {
    fontSize: 12,
    color: 'white',
    paddingTop: 10,
    paddingLeft: 12,
  },
  pickerSelectStyles: {
    width: '100%',
    height: 0,
    position: 'absolute',
    bottom: -10,
    fontSize: 8,
    left: -5,
  },
  scrollView: {
    width: '100%',
  },
  signIn: {
    width: 237,
    height: 57,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  startButton: {
    width: 237,
    height: 57,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: 'white',
    marginTop: 10,
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 21,
  },
  buttonContainer: {
    paddingTop: 20,
  },
  textStartButton: {
    color: 'black',
    fontWeight: '400',
    fontSize: 18,
  },
});
