import React, {useState} from 'react';
import {ScrollView, View, Text, StyleSheet, Pressable} from 'react-native';

const CountryFiltre = ({
  country,
  setCategorycategoryCountry,
  categoryCountry,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollViewContent}>
        {country?.map((elem, index) => {
          return (
            <Pressable
              key={index}
              style={styles.button}
              onPress={() => setCategorycategoryCountry(elem.key)}>
              <View style={styles.radioInput}>
                {categoryCountry === elem.key && (
                  <View style={styles.radioInputChild} />
                )}
              </View>
              <Text>{elem?.value}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default CountryFiltre;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 500,
    width: '100%',
    position: 'relative',
  },
  scrollViewContent: {
    position: 'absolute',
    height: 500,
    width: 500,
  },
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
