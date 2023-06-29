import * as React from 'react';
import {ScrollView, Text, View} from 'react-native';
import HeaderPosts from '../../../Components/PatreonsComponents/HeaderPosts';
import SinglePtareonsContent from '../../../Components/PatreonsComponents/SinglePtareonsContent';
import Gallery from '../../../Components/PatreonsComponents/Gallery';
import ShareIt from '../../../Components/PatreonsComponents/ShareIt';

function PatronsSinglePage() {
  return (
    <ScrollView>
      <View
        style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
        <HeaderPosts />
        <SinglePtareonsContent />
        <Gallery />
        <ShareIt />
      </View>
    </ScrollView>
  );
}
export default PatronsSinglePage;
