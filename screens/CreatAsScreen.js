import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Feather';
import {useTheme} from '@react-navigation/native';

const CreatAsScreen = ({navigation}) => {
  const navigateButton = page => {
    navigation.navigate(page);
  };
  const theme = useTheme();
  return (
    <LinearGradient
      start={{x: 1, y: 1}}
      end={{x: 1, y: 0}}
      colors={['#2F4F4F', '#2F4F4F', '#696969']}
      style={styles.linearGradient}>
      <StatusBar
        backgroundColor="transparent"
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.headerWidthButton}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="chevron-left" color={'#FFFFFF'} size={45} />
            </TouchableOpacity>
            <View style={styles.titlecontent}>
              <Text style={styles.text}>Create Profile As</Text>
              <Animatable.Image
                animation="fadeInUpBig"
                duraton="1500"
                source={require('../assets/logo.png')}
                style={styles.logo}
                resizeMode="stretch"
              />
            </View>
            <View />
          </View>
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigateButton('AccountInfoScreen')}>
              <View />
              <Text style={styles.textSign}>Sign up as user</Text>
              <Icon name="arrow-right" color={'white'} size={25} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigateButton('PriorityPageScreen')}>
              <View />
              <Text style={styles.textSign}>Sign up as shop</Text>
              <Icon name="arrow-right" color={'white'} size={25} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default CreatAsScreen;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 50,
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
    marginBottom: 30,
  },
  titlecontent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 40,
    marginVertical: 20,
  },
  logo: {
    width: '100%',
    height: 57,
    marginTop: 20,
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
    borderRadius: 20,
    borderColor: '#DFFF00',
    borderWidth: 1,
    width: 237,
    height: 57,
    justifyContent: 'space-around',
    backgroundColor: '#758468',
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 21,
  },
  dateText: {
    // marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
    height: '100%',
    width: '100%',
    paddingTop: 5,
  },
  action: {
    flexDirection: 'column',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    backgroundColor: '#FFFFFF',
    width: 250,
    height: 60,
    paddingVer: 30,
    borderRadius: 4,
    alignItems: 'flex-start',
  },
  inputHeader: {
    fontSize: 12,
    color: '#828282',
    paddingTop: 8,
    paddingLeft: 12,
  },
  scrollView: {
    width: '100%',
  },
  nameInput: {
    marginBottom: 15,
  },
});
