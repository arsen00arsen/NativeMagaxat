import React, {useState} from 'react';
import {TouchableOpacity, Text, View, StyleSheet, Image} from 'react-native';
import {useTranslation} from 'react-i18next';
import Entypo from 'react-native-vector-icons/Entypo';

const LANGUAGES = [
  {
    code: 'hy',
    label: 'Հայերեն',
    icon: (
      <Image
        source={require('.././assets/hy.png')}
        style={{
          width: 32,
          height: 32,
          backgroundColor: 'white',
          borderRadius: 50,
        }}
      />
    ),
  },
  {
    code: 'en',
    label: 'English',
    icon: (
      <Image
        source={require('.././assets/en.png')}
        style={{
          width: 32,
          height: 32,
          backgroundColor: 'white',
          borderRadius: 50,
        }}
      />
    ),
  },
  {
    code: 'ru',
    label: 'Русский',
    icon: (
      <Image
        source={require('.././assets/rus.png')}
        style={{
          width: 32,
          height: 32,
          backgroundColor: 'white',
          borderRadius: 50,
        }}
      />
    ),
  },
];

const SelectorLanguage = () => {
  const {i18n} = useTranslation();
  const selectedLanguageCode = i18n.language;
  const [check, setCheck] = useState(selectedLanguageCode);
  const setLanguage = code => {
    i18n.changeLanguage(code);
  };

  return (
    <View style={{width: '100%', marginBottom: 30}}>
      <View>
        {LANGUAGES.map((language, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.buttons,
                {
                  justifyContent: 'space-between',
                },
                index == 0
                  ? {borderTopRightRadius: 12, borderTopLeftRadius: 12}
                  : index == LANGUAGES.length - 1
                  ? {borderBottomRightRadius: 12, borderBottomLeftRadius: 12}
                  : null,
              ]}
              onPress={() => {
                setLanguage(language.code), setCheck(language.code);
              }}>
              <View style={styles.buttonContent}>
                <Text style={[styles.texts, {paddingRight: 10}]}>
                  {language.icon}
                </Text>
                <Text style={[styles.texts]}>{language.label}</Text>
              </View>
              <View style={styles.chekbox}>
                {check === language.code ? (
                  <Entypo name="check" size={24} color="red" />
                ) : null}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  buttons: {
    paddingHorizontal: 20,
    //paddingVertical: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 1,
    height: 70,
  },
  texts: {
    fontSize: 14,
    textTransform: 'uppercase',
    //marginLeft: 10,
  },
  chekbox: {
    width: 27,
    height: 27,
    borderColor: 'silver',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 50,
  },
  buttonContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SelectorLanguage;
