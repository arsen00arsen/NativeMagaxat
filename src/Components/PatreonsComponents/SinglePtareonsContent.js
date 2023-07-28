import * as React from 'react';
import {Image, View, StyleSheet, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
function SinglePtareonsContent() {
  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/fakeImages/png1.png')} />
      <View style={styles.component}>
        <Text style={styles.title}>Ani Manukyan</Text>
        <Text style={[styles.title, {fontWeight: 600, fontSize: 36}]}>
          Sport Masters HK
        </Text>
        <View style={{paddingTop: 20}}>
          <View style={styles.titleContent}>
            <Text style={styles.email}>infosportmasters@gmail.com</Text>
            <Ionicons name="ios-timer-outline" color={'#5F5F5F'} size={20} />
            <View>
              <Text style={styles.email}>08.06.2023- </Text>
              <Text style={styles.email}>08.07.2023</Text>
            </View>
          </View>
          <View style={[styles.titleContent, {marginTop: 20}]}>
            <View style={{justifyContent: 'flex-start', flexDirection: 'row'}}>
              <AntDesign name="link" color={'#5F5F5F'} size={20} />
              <Text style={[styles.email, {color: '#168BF8', paddingLeft: 10}]}>
                https://www.sports.ru/
              </Text>
            </View>
            <Text style={styles.email}>1500$</Text>
          </View>
        </View>
      </View>
      <View style={styles.orangeLine}>
        <Text style={{color: '#FFFFFF', fontSize: 16, paddingHorizontal: 15}}>
          Sport
        </Text>
        <Text style={{color: '#FFFFFF', fontSize: 16, paddingHorizontal: 15}}>
          Sport
        </Text>
        <Text style={{color: '#FFFFFF', fontSize: 16, paddingHorizontal: 15}}>
          Sport
        </Text>
        <Text style={{color: '#FFFFFF', fontSize: 16, paddingHorizontal: 15}}>
          Sport
        </Text>
      </View>
    </View>
  );
}
export default SinglePtareonsContent;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderColor: '#CFCCCC',
  },
  component: {
    width: '100%',
    padding: 15,
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: 'white',
  },
  title: {
    color: '#242424',
    fontSize: 26,
  },
  email: {
    color: '#5F5F5F',
    fontSize: 16,
  },
  titleContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  orangeLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ED7B12',
    height: 50,
    alignItems: 'center',
    marginBottom: 30,
  },
});
