import * as React from 'react';
import {View, Image, Text, Pressable} from 'react-native';
import GlobalStyles from '../../../Configs/GlobalStyles';

const ChatRoom = ({navigation}) => {
  return (
    <View
      style={[
        GlobalStyles.main__container,
        {
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: 'white',
        },
      ]}>
      <Pressable
        onPress={() => navigation.navigate('ChatContent')}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'white',
          paddingVertical: 10,
          width: '100%',
        }}>
        <Image
          source={require('./../../../../assets/fakeImages/png1.png')}
          style={{width: 50, height: 50, borderRadius: 25, marginRight: 5}}
        />
        <View style={{width: '70%'}}>
          <Text style={{color: '#111315', fontWeight: '500', fontSize: 17}}>
            Margar Khazaryan
          </Text>
          <Text style={{color: '#98A2B3', fontSize: 12}}>
            Barev axpers mi hat harmaracnes zangi
          </Text>
        </View>
        <Text style={{width: '20%'}}>22:10</Text>
      </Pressable>
    </View>
  );
};
export default ChatRoom;
