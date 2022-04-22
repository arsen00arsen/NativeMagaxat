import React, {useState, useEffect} from 'react';
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
import {baseUrl2} from '../../../http/index';
import {useNavigation} from '@react-navigation/native';
import HeaderChatSearchSecond from '../../../components/HeaderComponents/HeaderChatSearchSecond';
import {useDispatch} from 'react-redux';

const BenefactorsScreen = () => {
  const [data, setData] = useState('');
  const theme = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const url = baseUrl2 + '/benefactors_api';
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchData();
  }, []);

  let userProfilePage = item => {
    dispatch({type: 'USSER_ID', payload: item.id});
    navigation.navigate('BenefactorUserPageScreen');
  };
  let content = data.data?.map((elem, index) => {
    let img;
    if (elem?.image !== null) {
      img = {uri: elem.image};
    } else {
      img = require('../../../assets/defoult.png');
    }
    return (
      <View key={elem.id} style={styles.users}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => userProfilePage(elem)}>
          <LinearGradient
            style={styles.userProfile}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            locations={[0.0, 0.9]}
            colors={['#AFAFAF', '#E8E8E8']}>
            <View style={styles.imgFrame}>
              <Image source={img} style={styles.userImage} />
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
      <HeaderChatSearchSecond />
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
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 15,
    backgroundColor: '#F2F2F2',
    height: '100%',
  },
  users: {
    width: '46%',
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
