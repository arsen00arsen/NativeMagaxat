import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from '../../../Elements/Icon';
import Button from '../../../Elements/Button';

function PatronsContent({}) {
  const [longDes, setLongDes] = useState(false);
  const navigation = useNavigation();
  const isLongDs = () => {
    setLongDes(!longDes);
  };
  let description;
  if (longDes === false) {
    description = (
      <Text style={[styles.usersTitle, {marginBottom: 5}]} numberOfLines={5}>
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less normal distribution of
        letters, as opposed to using 'Content here, content here', making it
        look like readable English.
      </Text>
    );
  } else {
    description = (
      <Text style={[styles.longDis, {marginBottom: 5}]}>
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less normal distribution of
        letters, as opposed to using 'Content here, content here', making it
        look like readable English.
      </Text>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.component}>
        <Image
          source={require('../../../../assets/fakeImages/png1.png')}
          style={{width: 78, height: 78, borderRadius: 45}}
        />
        <View style={{width: '70%', marginHorizontal: 15}}>
          <View style={styles.titleContent}>
            <Text style={styles.title}>Sport Masters HK</Text>
            <Icon name="trophy" isPrimary size={36} />
          </View>
          <View style={styles.titleContent}>
            <Text style={styles.email}>infosportmasters@gmail.com</Text>
            <Icon name="telegram" color={'#5F5F5F'} size={20} />
          </View>
        </View>
      </View>
      <View>
        <Text
          style={{
            color: '#000',
            fontSize: 16,
            fontWeight: 500,
            marginBottom: 10,
          }}>
          Description
        </Text>
        {description}
        <TouchableOpacity onPress={isLongDs}>
          <Text style={{color: 'red', textAlign: 'right'}}>Reade More</Text>
        </TouchableOpacity>
      </View>
      <View style={{width: '60%', marginTop: 20}}>
        <Button
          isPrimary
          onPress={() => navigation.navigate('PatronsSinglePage')}>
          <Text style={{color: 'white', fontWeight: 600, fontSize: 18}}>
            Learn More
          </Text>
        </Button>
      </View>
    </View>
  );
}
export default PatronsContent;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'column',
    padding: 15,
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: '#CFCCCC',
  },
  component: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: '#242424',
    fontSize: 32,
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
});
