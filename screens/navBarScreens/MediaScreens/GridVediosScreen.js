import * as React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import IconPlay from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import HeaderBackSearch from '../../../components/HeaderComponents/HeaderBackSearch';
import Pleyer from './Pleyer';

export default function GridVediosScreen(props) {
  let user = props.route.params.user;
  const navigation = useNavigation();
  const {medias} = useSelector(state => state.medias);
  const videoRef = React.useRef(null);
  let content = medias.map(elem => {
    return (
      <View style={styles.row} key={elem.id}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('GridVediosScreen', {
              user: elem,
            })
          }>
          <Image source={{uri: elem.video_name}} style={styles.rowVideo} />
          <IconPlay
            name="play"
            size={25}
            color="gray"
            style={styles.icPlayRow}
          />
        </TouchableOpacity>
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <HeaderBackSearch />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{width: '100%', flex: 1}}>
        <View style={styles.column}>
          <Pleyer video_path={user.video_path} />
        </View>
        <View style={{paddingHorizontal: 15}}>
          <View style={styles.userBody}>
            <View style={styles.imgFrame}>
              <Image
                source={{uri: user?.user?.image}}
                style={styles.userImage}
              />
            </View>
            <View style={styles.flexColumn}>
              <Text style={styles.username}>{user?.user?.name} </Text>
              <Text style={styles.username}>{user?.user?.lastname}</Text>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.flexWrap}>{content}</View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // paddingHorizontal: 15,
    paddingTop: 15,
    backgroundColor: '#F2F2F2',
    height: '100%',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    width: '49%',
    borderRadius: 8,
  },
  rowVideo: {
    width: '100%',
    minWidth: 170,
    height: 100,
    borderRadius: 8,
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 8,
  },
  columnVideo: {
    alignSelf: 'center',
    width: '100%',
    minWidth: 330,
    height: 150,
    borderRadius: 8,
  },
  userBody: {
    width: '100%',
    height: 107,
    backgroundColor: '#EDEDED',
    marginVertical: 20,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  imgFrame: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#E6E6E6',
    width: 107,
    height: 107,
  },
  userImage: {
    width: 103,
    height: 103,
    borderRadius: 999,
    borderColor: '#E6E6E6',
    borderWidth: 3,
  },
  username: {
    color: '#727272',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 'auto',
  },
  subScribeButton: {
    backgroundColor: '#BB9E79',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 117,
    height: 43,
    borderRadius: 5,
    marginHorizontal: 40,
  },

  subScribeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  userText: {
    fontSize: 16,
    color: '#383838',
    textAlign: 'left',
    marginBottom: 20,
  },
  line: {
    borderWidth: 1,
    borderColor: '#E6E6E6',
    width: '100%',
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginLeft: 10,
  },
  flexWrap: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  icPlayRow: {
    marginLeft: 'auto',
    marginRight: 'auto',
    left: '45%',
    top: 35,
    position: 'absolute',
  },
});
