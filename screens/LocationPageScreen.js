import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
// import CountryCodeList from '../components/CountryCodeList';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Picker} from '@react-native-picker/picker';

const LocationPageScreen = ({navigation}) => {
  const [selectedInter, setSselectedInter] = React.useState('');

  return (
    <LinearGradient
      start={{x: 1, y: 1}}
      end={{x: 1, y: 0}}
      colors={['#D6AB6F', '#B8B8B8', '#674C31']}
      style={styles.linearGradient}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.headerWidthButton}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="home-outline" color={'#FFFFFF'} size={20} />
            </TouchableOpacity>
            <View style={styles.titlecontent}>
              <Text style={styles.text}>Choose</Text>
              <Text style={styles.text}>priority</Text>
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
            <View style={styles.action}>{/* <CountryCodeList /> */}</View>
            <View style={styles.action}>
              <Text style={styles.inputHeader}>Language</Text>
              <Picker
                selectedValue={selectedInter}
                style={styles.pickerSelectStyles}
                onValueChange={(itemValue, itemIndex) =>
                  setSselectedInter(itemValue)
                }>
                <Picker.Item label="English" value="english" />
                <Picker.Item label="Armenian" value="armenian" />
                <Picker.Item label="Russian" value="russian" />
              </Picker>
            </View>
          </View>
          <View>
            {/* <TouchableOpacity style={styles.signIn}>
              <LinearGradient
                colors={['#88673A', '#3C3835']}
                style={styles.signIn}>
                <Text style={styles.textSign}>Log In</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('SplashScreen')}>
              <View />
              <Text style={styles.textSign}>Start</Text>
              <Icon name="home-outline" color={'#FFFFFF'} size={20} />
            </TouchableOpacity> */}
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default LocationPageScreen;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
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
  inputHeader: {
    fontSize: 12,
    color: '#828282',
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
  textSign: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 21,
  },
});
