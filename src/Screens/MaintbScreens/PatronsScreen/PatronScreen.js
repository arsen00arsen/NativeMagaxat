import * as React from 'react';
import {Text, View} from 'react-native';
import SearchComponent from '../../../Elements/SearchComponent';
import PatronsContent from './PatronsContent';

function PatronScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
      <SearchComponent />
      <PatronsContent />
    </View>
  );
}
export default PatronScreen;
