import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Picker} from '@react-native-picker/picker';
import {useSelector, useDispatch} from 'react-redux';

const PriorityPageScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [selectedInter1, setSselectedInter1] = React.useState('');
  const [selectedInter2, setSselectedInter2] = React.useState('');

  // const name = useSelector(state => state.usser);
  // console.log(name);
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
            <Icon name="home-outline" color={'#FFFFFF'} size={20} />
          </TouchableOpacity>
          <View style={styles.titlecontent}>
            <Text style={styles.text}>Choose</Text>
            <Text style={styles.text}>priority</Text>
          </View>
          <View />
        </View>
        <View>
          <Animatable.Image
            animation="fadeInUpBig"
            duraton="1500"
            source={require('../assets/priority.png')}
            style={styles.logo}
            resizeMode="stretch"
          />
          <View style={styles.action}>
            <Text style={styles.inputHeader}>Type</Text>
            <Picker
              selectedValue={selectedInter1}
              style={styles.pickerSelectStyles}
              onValueChange={(itemValue, itemIndex) => {
                setSselectedInter1(itemValue),
                  dispatch({
                    type: 'USSER_SIGN_UP_INTERESTEDTYPE',
                    payload: {interesting_type: itemValue},
                  });
              }}>
              <Picker.Item label="It" value="it" />
              <Picker.Item label="Footbole" value="footbole" />
            </Picker>
          </View>
          <View style={styles.action}>
            <Text style={styles.inputHeader}>Type Indigent</Text>
            <Picker
              selectedValue={selectedInter2}
              style={styles.pickerSelectStyles}
              onValueChange={(itemValue, itemIndex) => {
                setSselectedInter2(itemValue),
                  dispatch({
                    type: 'USSER_SIGN_UP_INTERESTEDTYPE_INDIGENT',
                    payload: {interesting_typeIndigent: itemValue},
                  });
              }}>
              <Picker.Item label="Talent" value="talent" />
              <Picker.Item label="Advertising" value="advertising" />
            </Picker>
          </View>
        </View>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('CreatePasswordScreen')}>
            <View />
            <Text style={styles.textSign}>Next</Text>
            <Icon name="home-outline" color={'#FFFFFF'} size={20} />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default PriorityPageScreen;

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
  titlecontent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    width: 245,
    height: 200,
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
    justifyContent: 'space-around',
  },
  arrowIcon: {
    marginRight: 20,
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 21,
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
});
