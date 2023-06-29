import React, {useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Gallery from '../../../Components/PatreonsComponents/Gallery';
import FreandsContent from '../../../Components/FreandsComponent/FreandsContent';

function FreandsSingleScreen() {
  const [longDes, setLongDes] = useState(false);
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
    <ScrollView>
      <View style={styles.container}>
        <FreandsContent />
        <Gallery />
        <View style={{paddingHorizontal: 15}}>
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
            <Text style={{color: '#ED7B12', textAlign: 'right'}}>
              Reade More
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
export default FreandsSingleScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 150,
  },
});
