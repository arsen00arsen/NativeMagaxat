import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import {Picker} from '@react-native-picker/picker';

const IneterestingAreaScreen = ({navigation}) => {
  const [selectedInter1, setSselectedInter1] = React.useState('');
  const [selectedInter2, setSselectedInter2] = React.useState('');
  const [selectedInter3, setSselectedInter3] = React.useState('');

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
              <Text style={styles.text}>Your 3 most</Text>
              <Text style={styles.text}>interesting areas</Text>
            </View>
            <View />
          </View>

          <Animatable.Image
            animation="fadeInUpBig"
            duraton="1500"
            source={require('../assets/interesting.png')}
            style={styles.logo}
            resizeMode="stretch"
          />
          <View>
            <View style={styles.action}>
              <Text style={styles.inputHeader}>Interest #1</Text>
              <Picker
                selectedValue={selectedInter1}
                style={styles.pickerSelectStyles}
                onValueChange={(itemValue, itemIndex) =>
                  setSselectedInter1(itemValue)
                }>
                <Picker.Item label="It" value="it" />
                <Picker.Item label="Footbole" value="footbole" />
              </Picker>
            </View>
            <View style={styles.action}>
              <Text style={styles.inputHeader}>Interest #2</Text>
              <Picker
                selectedValue={selectedInter2}
                style={styles.pickerSelectStyles}
                onValueChange={(itemValue, itemIndex) =>
                  setSselectedInter2(itemValue)
                }>
                <Picker.Item label="Marketing" value="marketing" />
                <Picker.Item label="Advertising" value="advertising" />
              </Picker>
            </View>
            <View style={styles.action}>
              <Text style={styles.inputHeader}>Interest #3</Text>
              <Picker
                selectedValue={selectedInter3}
                style={styles.pickerSelectStyles}
                onValueChange={(itemValue, itemIndex) =>
                  setSselectedInter3(itemValue)
                }>
                <Picker.Item label="Education" value="education" />
                <Picker.Item label="Training" value="training" />
              </Picker>
            </View>
          </View>
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('PriorityPageScreen')}>
              <View />
              <Text style={styles.textSign}>Next</Text>
              <Icon name="home-outline" color={'#FFFFFF'} size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default IneterestingAreaScreen;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 50,
  },
  scrollView: {
    width: '100%',
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
    width: 160,
    height: 191,
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
});
