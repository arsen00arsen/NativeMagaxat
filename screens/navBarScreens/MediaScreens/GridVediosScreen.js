import * as React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import VideoPlayer from 'react-native-video-player';
import HeaderBackSearch from '../../../components/HeaderComponents/HeaderBackSearch';

export default function GridVediosScreen() {
  const ANIMAL_NAMES = [
    {
      id: 1,
      userVedio: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    },
    {
      id: 2,
      userVedio: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    },
    {
      id: 3,
      userVedio: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    },
    {
      id: 4,
      userVedio: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    },
  ];

  let content = ANIMAL_NAMES.map(elem => {
    return (
      <View key={elem.id} style={styles.row}>
        <VideoPlayer
          video={{uri: elem.userVedio}}
          autoplay={false}
          defaultMuted={true}
          thumbnail={require('../../../assets/logoHeader.png')}
          style={styles.rowVideo}
        />
      </View>
    );
  });
  return (
    <View style={styles.container}>
      <HeaderBackSearch />
      <ScrollView showsVerticalScrollIndicator={false} style={{width: '100%'}}>
        <View style={styles.column}>
          <VideoPlayer
            video={{
              uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
            }}
            autoplay={false}
            defaultMuted={true}
            thumbnail={require('../../../assets/logoHeader.png')}
            style={styles.columnVideo}
          />
        </View>

        <View style={styles.userBody}>
          <View style={styles.imgFrame}>
            <Image
              source={require('../../../assets/Nikol.png')}
              style={styles.userImage}
            />
          </View>
          <View style={styles.flexColumn}>
            <Text style={styles.username}>Nikol</Text>
            <Text style={styles.username}>Pashinyan</Text>
          </View>

          <TouchableOpacity style={styles.subScribeButton}>
            <Text style={styles.subScribeText}>Subscribe</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.userText}>
          Մեր կրթական ծրագրերը ներառում են «Շող» կենտրոնները, որոնք ավելի ուշ
          սկսեցինք՝ 2010թ․ և որոնց ուղղվածությունը և՛ կրթական է, և՛ սոցիալական։
        </Text>
        <View style={styles.line} />
        <View style={styles.flexWrap}>{content}</View>
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
    paddingHorizontal: 15,
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
    minWidth: 180,
    height: 100,
    borderRadius: 8,
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
    borderRadius: 8,
  },
  columnVideo: {
    alignSelf: 'center',
    width: '100%',
    height: 200,
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
    justifyContent: 'space-between',
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
  },
  flexWrap: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
});
