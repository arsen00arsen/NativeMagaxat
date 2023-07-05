import * as React from 'react';
import {Pressable, Text, StyleSheet, View, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileInfo from '../../../Components/Profile/ProfileInfo';

function MyProfileScreen() {
  const buttons = [
    {id: 1, title: 'Language'},
    {id: 2, title: 'Bio'},
    {id: 3, title: 'My Posts'},
    {id: 4, title: 'Permanently Delete'},
    {id: 5, title: 'Support'},
    {id: 6, title: 'Settings'},
    {id: 7, title: 'Logout'},
  ];
  return (
    <ScrollView>
      <View style={styles.container}>
        <ProfileInfo />
        <View style={styles.component}>
          {buttons.map(elem => {
            return (
              <Pressable key={elem.id} style={styles.botton}>
                <Text style={styles.title}>{elem.title}</Text>
                <Ionicons
                  name="ios-chevron-forward-sharp"
                  color={'#B5B5BE'}
                  size={20}
                />
              </Pressable>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}
export default MyProfileScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  component: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    width: '100%',
    paddingHorizontal: 15,
    paddingTop: 30,
  },
  botton: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#C6C6C8',
  },
  title: {
    color: '#000000',
    fontSize: 16,
  },
});
