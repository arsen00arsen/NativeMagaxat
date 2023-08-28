import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

const AgeFiltre = ({age, setCategoryAge, categoryAge}) => {
  console.log(categoryAge)
  return (
    <View style={styles.container}>
      {age?.map((elem, index) => {
        return (
          <Pressable
            key={index}
            style={styles.button}
            onPress={() => setCategoryAge(elem)}>
            <View style={styles.radioInput}>
              <View style={styles.radioInputChild} />
            </View>

            <Text>
              {elem?.start}-{elem?.end}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default AgeFiltre;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: '#CCD1D2',
    flexDirection: 'row',
  },
  radioInput: {
    width: 20,
    height: 20,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  radioInputChild: {
    width: 10,
    height: 10,
    backgroundColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
  },
});
