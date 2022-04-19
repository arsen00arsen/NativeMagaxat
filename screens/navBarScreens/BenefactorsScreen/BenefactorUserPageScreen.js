import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TextInput,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import HeaderBackSearch from '../../../components/HeaderComponents/HeaderBackSearch';
import VideoPlayer from 'react-native-video-player';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5Brands from 'react-native-vector-icons/Fontisto';

const BenefactorUserPageScreen = ({navigation}) => {
  const theme = useTheme();

  const [text, onChangeText] = React.useState('');
  const ANIMAL_NAMES = [
    {
      id: 1,
      userVedio: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    },
    {
      id: 2,
      userVedio: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    },
  ];
  let videoContent = ANIMAL_NAMES.map((elem, index) => {
    return (
      <View key={elem.id} style={styles.column}>
        <VideoPlayer
          uri={elem.userVedio}
          autoplay={false}
          defaultMuted={true}
          thumbnail={require('../../../assets/logoHeader.png')}
          style={styles.video}
        />
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#009387"
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      <HeaderBackSearch />
      <ScrollView style={{width: '100%'}} showsVerticalScrollIndicator={false}>
        <View style={styles.userInfo}>
          <Image
            source={require('../../../assets/Nikol.png')}
            style={styles.userImage}
          />
          <View>
            <Text style={styles.nameSurname}>Nikol</Text>
            <Text style={styles.nameSurname}>Pashinyan</Text>
            <Text style={styles.idNumber}>ID 620e4b6a4908b</Text>
          </View>
        </View>
        <View style={styles.textBody}>
          <Text style={styles.text}>
            Հիմնադրվելով 1992 թվականին՝ «Հայաստան» համահայկական հիմնադրամը եզակի
            մի կառույց է, որի նպատակն է ստեղծել համահայկական ցանց, աջակցել
            Հայաստանին և աշխարհի հայերին, իրականացնել Հայաստանի և Արցախի կայուն
            ու համաչափ զարգացումը ապահովող ծրագրեր։
          </Text>
        </View>
        <View style={styles.contentVideo}>{videoContent}</View>
        <View style={styles.helpTextContainer}>
          <Text style={styles.helpTitle}>How can I help?</Text>
          <Text style={styles.helpText}>
            To help William, you can send your desired amount to the Magaxat
            account, marking the recipient ID
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <SafeAreaView>
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              value={text}
              placeholder={'620e4b6a4908b'}
            />
          </SafeAreaView>
          <TouchableOpacity
            onPress={() => alert('Button Clicked!')}
            style={styles.button}>
            <Icon name="chevron-right" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.makeContainer}>
          <Text style={styles.helpTitle}>Make</Text>
          <TouchableOpacity
            onPress={() => alert('Button Clicked!')}
            style={styles.transferButton}>
            <MaterialIcons name="online-prediction" size={24} color="#AF9065" />
            <Text style={styles.bottomTextStyle}>Online Transfer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => alert('Button Clicked!')}
            style={styles.transferButton}>
            <FontAwesome name="bank" size={24} color="#AF9065" />
            <Text style={styles.bottomTextStyle}>Bank Transfer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => alert('Button Clicked!')}
            style={styles.transferButton}>
            <Ionicons name="cloud-download" size={24} color="#AF9065" />
            <Text style={styles.bottomTextStyle}>Download document</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.socialContainer}>
          <Text style={styles.helpTitle}>Share It</Text>
          <View style={styles.socialLinks}>
            <Ionicons name="logo-facebook" size={40} color="black" />
            <MaterialCommunityIcons
              name="facebook-messenger"
              size={40}
              color="black"
            />
            <FontAwesome name="whatsapp" size={40} color="black" />
          </View>
          <View style={styles.socialLinks}>
            <FontAwesome name="twitter" size={40} color="black" />
            <FontAwesome name="instagram" size={40} color="black" />
            <FontAwesome5Brands name="viber" size={40} color="black" />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default BenefactorUserPageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
    paddingTop: 15,
    backgroundColor: '#F2F2F2',
    height: '100%',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  userImage: {
    width: 107,
    height: 107,
    borderRadius: 50,
    marginRight: 30,
  },
  nameSurname: {
    color: '#727272',
    fontSize: 24,
    textAlign: 'left',
  },
  idNumber: {
    color: '#000000',
    fontSize: 18,
    textAlign: 'left',
  },
  textBody: {
    width: '100%',
    height: 150,
    marginVertical: 30,
  },
  text: {
    color: '#383838',
    fontSize: 16,
    textAlign: 'left',
  },
  contentVideo: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    width: '49%',
    height: 100,
    borderRadius: 8,
  },
  video: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
  helpTextContainer: {
    marginVertical: 30,
  },
  helpTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#000000',
  },
  helpText: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    width: 250,
    height: 50,
    borderColor: 'silver',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
  },
  button: {
    width: 70,
    height: 50,
    backgroundColor: '#AF9065',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  makeContainer: {
    marginVertical: 30,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  transferButton: {
    width: '100%',
    height: 64,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 20,
    paddingLeft: 70,
  },
  socialContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'column',
    // alignItems: "space-between",
    justifyContent: 'space-between',
    width: 200,
    height: 160,
    marginBottom: 40,
  },
  socialLinks: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  bottomTextStyle: {
    color: '#AF9065',
    fontSize: 18,
    paddingLeft: 40,
  },
});
