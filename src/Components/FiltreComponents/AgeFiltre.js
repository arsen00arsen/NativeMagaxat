import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const AgeFiltre = () => {
  const [isSelected, setSelection] = useState(false);
  let array = [
    {id: 1, title: 'Art'},
    {id: 2, title: 'Busines'},
    {id: 3, title: 'Music'},
    {id: 4, title: 'Music'},
  ];
  return (
    <View style={styles.container}>
      {array.map(elem => {
        return (
          <View
            key={elem.id}
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderBottomWidth: 0.5,
              borderColor: '#CCD1D2',
            }}>
            <Text>{elem.title}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default AgeFiltre;

const styles = StyleSheet.create({});
