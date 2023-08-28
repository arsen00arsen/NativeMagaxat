import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';

function HeaderPosts({name}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{'Profiles  >   '} </Text>
      <Text style={styles.text}>{name}{'  >   '} </Text>
      <Text style={styles.text}>{'Posts    '} </Text>
    </View>
  );
}
export default HeaderPosts;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
  },
  text: {
    color: '#939393',
  },
});
