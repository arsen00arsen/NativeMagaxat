import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
// import HeaderFilterSearch from '../../components/HeaderComponent/HeaderFilterSearch';
// import {LinearGradient} from 'expo-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import HeaderBackSearch from '../../../components/HeaderComponents/HeaderBackSearch';

const BenefactorsScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const ANIMAL_NAMES = [
    {
      id: 1,
      name: 'Nikol Pashinyan',
      // userImage: "../../assets/FakeImages/Nikol.png"
    },
    {
      id: 2,
      name: 'Robert Qocharyan',
    },
    {
      id: 3,
      name: 'Anjela Sargsyan',
    },
    {
      id: 4,
      name: 'Serj Sargsyan',
    },
    {
      id: 5,
      name: 'Hayk Marutyan',
    },
    {
      id: 6,
      name: 'Levon Ter-Petrosyan',
    },
    {
      id: 7,
      name: 'Vazgen Sargsyan',
    },
  ];
  let content = ANIMAL_NAMES.map((elem, index) => {
    return (
      <View key={elem.id} style={styles.users}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('BenefactorUserPageScreen')}>
          <LinearGradient
            style={styles.userProfile}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            locations={[0.0, 0.9]}
            colors={['#AFAFAF', '#E8E8E8']}>
            <View style={styles.imgFrame}>
              <Image
                source={require('../../../assets/Nikol.png')}
                style={styles.userImage}
              />
            </View>
            <Text style={styles.userName}>{elem.name}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#009387"
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      {/* <HeaderFilterSearch /> */}
      <HeaderBackSearch />
      <ScrollView style={{width: '100%'}} showsVerticalScrollIndicator={false}>
        <View style={styles.flexWraps}>{content}</View>
      </ScrollView>
    </View>
  );
};

export default BenefactorsScreen;

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
  users: {
    width: '49%',
  },
  userProfile: {
    width: 164,
    height: 200,
    display: 'flex',
    borderRadius: 8,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  imgFrame: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#E6E6E6',
    width: 89,
    height: 89,
  },
  userImage: {
    width: 83,
    height: 83,
    borderRadius: 50,
  },
  userName: {
    width: 100,
    fontSize: 18,
    color: '#727272',
    textAlign: 'center',
  },
  flexWraps: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
