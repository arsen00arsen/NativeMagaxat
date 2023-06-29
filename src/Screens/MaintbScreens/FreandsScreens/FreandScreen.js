import * as React from 'react';
import {Text, View} from 'react-native';
import SearchComponent from '../../../Elements/SearchComponent';
import FreandsContent from '../../../Components/FreandsComponent/FreandsContent';

function FreandScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
      <SearchComponent />
      <FreandsContent />
    </View>
  );
}
export default FreandScreen;
