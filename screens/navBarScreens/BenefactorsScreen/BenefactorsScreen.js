import React, {useState, useEffect} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {useIsFocused, useTheme} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import HeaderBackSearchSecond from '../../../components/HeaderComponents/HeaderBackSearchSecond';
import BenefactorsComponent from '../../../components/BenefactorsComponent';
import {loadAppears} from '../../../stores/appears/appearAction';
const BenefactorsScreen = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [currentPage, setCurrentPage] = useState(1);

  const loadMoreItem = () => {
    setCurrentPage(currentPage + 1);
    dispatch(loadAppears(currentPage + 1));
  };
  useEffect(() => {
    if (isFocused) {
      dispatch(loadAppears(1));
    }
  }, []);
  // const loadMoreItem = () => {
  //   setCurrentPages(currentPages + 1);
  //   dispatch(loadAppears(currentPages + 1));
  // };

  // const loadMoreItem = () => {
  //   setCurrentPages(currentPages);
  // };
  // useEffect(() => {
  //   dispatch(loadAppears(currentPages));
  // }, [currentPages]);
  // let userProfilePage = item => {
  //   navigation.navigate('BenefactorUserPageScreen', {
  //     id: item.id,
  //   });
  // };

  // const renderLoader = () => {
  //   return isLoading ? (
  //     <View style={styles.loaderStyle}>
  //       <ActivityIndicator size="large" color="#aaa" />
  //     </View>
  //   ) : null;
  // };

  // const renderItem = ({item, index}) => {
  //   return (
  //     <View key={index}>
  //       <View style={[styles.button, styles.shadowProp]}>
  //         <View style={styles.imgFrame}>
  //           <Image source={{uri: item.image}} style={styles.userImage} />
  //         </View>
  //         <View style={styles.descriptionContent}>
  //           <Text style={styles.title} numberOfLines={2}>
  //             {item.description}
  //           </Text>
  //           <TouchableOpacity
  //             onPress={() => userProfilePage(item)}
  //             style={styles.view}>
  //             <Text style={styles.viewText}>View</Text>
  //           </TouchableOpacity>
  //         </View>
  //       </View>
  //     </View>
  //   );
  // };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#FFFFFF"
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      <HeaderBackSearchSecond pageTo={'BenefactorSearchPage'} />
      <BenefactorsComponent
        isFocused={isFocused}
        navigation={navigation}
        loadMoreItem={loadMoreItem}
      />
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
    backgroundColor: '#FFF',
    height: '100%',
  },
  users: {
    width: '100%',
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
  title: {
    width: '90%',
    fontWeight: 'bold',
    color: '#AF9065',
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#F2F2F2',
    borderRadius: 30,
    backgroundColor: '#F2F2F2',
  },
  descriptionContent: {
    width: '60%',
  },
  view: {
    width: '90%',
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#AF9065',
    borderRadius: 30,
    marginVertical: 5,
  },
  viewText: {
    color: '#FFF',
    fontSize: 20,
  },
  usersEmpoty: {
    flex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textEmpoty: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 60,
  },
});
