import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import HeaderBackSearchSecond from '../../../components/HeaderComponents/HeaderBackSearchSecond';

import AccountUsers from './AccountUsers';
import AccountBenefactors from './AccountBenefactors';

const AccountsScreen = () => {
  const theme = useTheme();
  const [select, isSelect] = useState('Users');

  const selectedType = type => {
    isSelect(type);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#009387"
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      <HeaderBackSearchSecond pageTo={'AccountSearch'} />
      <ScrollView style={{width: '100%'}} showsVerticalScrollIndicator={false}>
        <View style={styles.titleButtons}>
          <TouchableOpacity
            style={[
              select === 'Users' ? styles.buttons : styles.isSelectedButton,
            ]}
            onPress={() => selectedType('Users')}>
            <Text style={styles.buttonText}>Users</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              select === 'Benefactors'
                ? styles.buttons
                : styles.isSelectedButton,
            ]}
            onPress={() => selectedType('Benefactors')}>
            <Text style={styles.buttonText}>Benefactors</Text>
          </TouchableOpacity>
        </View>
        {select === 'Users' ? <AccountUsers /> : <AccountBenefactors />}
      </ScrollView>
    </View>
  );
};

export default AccountsScreen;

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

  titleButtons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  buttons: {
    width: '48%',
    height: 50,
    borderWidth: 1,
    borderColor: '#fff',
    alignItems: 'center',
    backgroundColor: '#D2C8B9',
    borderRadius: 5,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '400',
  },
  isSelectedButton: {
    width: '48%',
    height: 50,
    borderWidth: 1,
    borderColor: '#fff',
    alignItems: 'center',
    backgroundColor: 'silver',
    borderRadius: 5,
    justifyContent: 'center',
  },
});
