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
import { useTranslation } from 'react-i18next';

const AccountsScreen = () => {
  const {t} = useTranslation();
  const theme = useTheme();
  const [select, isSelect] = useState('Users');

  const selectedType = type => {
    isSelect(type);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="##FFFFFF"
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      <HeaderBackSearchSecond pageTo={'AccountSearch'} searchFor={select} />
      <ScrollView style={{width: '100%'}} showsVerticalScrollIndicator={false}>
        <View style={styles.titleButtons}>
          <TouchableOpacity
            style={[
              select === 'Users' ? styles.buttons : styles.isSelectedButton,
            ]}
            onPress={() => selectedType('Users')}>
            <Text style={styles.buttonText}>{t('users')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              select === 'Sponsor' ? styles.buttons : styles.isSelectedButton,
            ]}
            onPress={() => selectedType('Sponsor')}>
            <Text style={styles.buttonText}>{t('sponsors')}</Text>
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
    paddingHorizontal: 5,
    paddingTop: 15,
    backgroundColor: '#f7f7f7',
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
