import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Gallery from '../../../Components/PatreonsComponents/Gallery';
import FreandsContent from '../../../Components/FreandsComponent/FreandsContent';
import UserService from '../../../http/Account/account';
import {useTranslation} from 'react-i18next';

function FreandsSingleScreen({route}) {
  const {t} = useTranslation();
  const id = route?.params?.id;
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const [isDescriptionTooLong, setIsDescriptionTooLong] = useState(false);
  const [longDes, setLongDes] = useState(false);

  const isLongDs = () => {
    setLongDes(!longDes);
  };

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    setLoading(true);
    try {
      const {data} = await UserService.getSingleFreand(id);
      setUser(data.data);
    } catch (err) {
      console.log(err.response);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <View style={styles.loadings}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <FreandsContent user={user} />
        {user?.patrons.map((elem, index) => {
          const handleTextLayout = e => {
            const {lines} = e.nativeEvent;
            if (lines.length > 4) {
              setIsDescriptionTooLong(true);
            }
          };
          let description;
          if (longDes === false) {
            description = (
              <Text
                style={[styles.usersTitle, {marginBottom: 5}]}
                numberOfLines={5}
                onTextLayout={handleTextLayout}>
                {elem.description}
              </Text>
            );
          } else {
            description = (
              <Text style={[styles.longDis, {marginBottom: 5}]}>
                {elem.description}
              </Text>
            );
          }
          return (
            <View style={{padding: 15, width: '100%'}} key={index}>
              <Text
                style={[
                  styles.usersTitle,
                  {
                    marginBottom: 5,
                    textAlign: 'right',
                    fontSize: 12,
                    color: 'silver',
                  },
                ]}>
                {elem?.duration}
              </Text>
              <Text
                style={{
                  color: '#000',
                  fontSize: 16,
                  fontWeight: '500',
                  marginBottom: 10,
                }}>
                {t('title')}
              </Text>
              <Text style={[styles.usersTitle, {marginBottom: 5}]}>
                {elem?.title}
              </Text>
              <Text
                style={{
                  color: '#000',
                  fontSize: 16,
                  fontWeight: '500',
                  marginBottom: 10,
                }}>
                {t('price')}
              </Text>
              <Text style={[styles.usersTitle, {marginBottom: 5}]}>
                {elem?.price}
              </Text>

              <Text
                style={{
                  color: '#000',
                  fontSize: 16,
                  fontWeight: '500',
                  marginBottom: 10,
                }}>
                {t('description')}
              </Text>
              {description}
              {isDescriptionTooLong && (
                <TouchableOpacity onPress={isLongDs}>
                  <Text style={{color: 'red', textAlign: 'right'}}>
                    {!longDes ? t('read_more') : t('read_less')}
                  </Text>
                </TouchableOpacity>
              )}
              <Gallery post={elem?.file} />
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
export default FreandsSingleScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 150,
  },
});
