import * as React from 'react';
import {Image, View, StyleSheet, Text, Linking} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
function SinglePtareonsContent({user, post}) {
  return (
    <View style={styles.container}>
      <Image
        source={{uri: user?.avatar}}
        style={{width: '100%', height: 250}}
      />
      <View style={styles.component}>
        <Text style={styles.title}>{user?.name}</Text>
        <Text style={[styles.title, {fontWeight: '600', fontSize: 36}]}>
          {user?.title}
        </Text>
        <View style={{paddingTop: 20}}>
          <View style={styles.titleContent}>
            <Text style={styles.email}> {user?.email}</Text>
            <View style={{flexDirection: 'row'}}>
              <Ionicons name="ios-timer-outline" color={'#5F5F5F'} size={20} />
              <View>
                <Text style={[styles.email, {marginLeft: 5}]}>
                  {post?.duration}
                </Text>
                {/* <Text style={styles.email}>08.07.2023</Text> */}
              </View>
            </View>
          </View>
          <View style={[styles.titleContent, {marginTop: 20}]}>
            <View style={{justifyContent: 'flex-start', flexDirection: 'row'}}>
              <AntDesign name="link" color={'#5F5F5F'} size={20} />
              <Text
                onPress={() => Linking.openURL(post?.url)}
                style={[styles.email, {color: '#168BF8', paddingLeft: 10}]}>
                {post?.url}
              </Text>
            </View>
            <Text style={styles.email}>{post?.price}</Text>
          </View>
        </View>
      </View>
      <View style={styles.orangeLine}>
        {post?.categories?.map(elem => {
          return (
            <Text
              key={elem.key}
              style={{color: '#FFFFFF', fontSize: 16, paddingHorizontal: 15}}>
              {elem?.value}
            </Text>
          );
        })}
      </View>
    </View>
  );
}
export default SinglePtareonsContent;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderColor: '#CFCCCC',
  },
  component: {
    width: '100%',
    padding: 15,
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: 'white',
  },
  title: {
    color: '#242424',
    fontSize: 26,
  },
  email: {
    color: '#5F5F5F',
    fontSize: 16,
  },
  titleContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  orangeLine: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: '#ED7B12',
    height: 50,
    alignItems: 'center',
    marginBottom: 30,
  },
});
