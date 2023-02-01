import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './constants/translations/en/common';
import hy from './constants/translations/hy/common';
import ru from './constants/translations/ru/common';
const LANGUAGE_DETECTOR = {
  type: 'languageDetector',
  async: true,
  detect: callback => {
    AsyncStorage.getItem('user-language', (err, language) => {
      if (err || !language) {
        callback('en');
        // if (err) {
        //   //console.log('Error fetching Languages from asyncstorage ', err);
        // } else {
        //   //console.log('No language is set, choosing English as fallback');
        // }
        // const findBestAvailableLanguage =
        //   RNLocalize.findBestAvailableLanguage(LANG_CODES);
        return;
      }
      callback(language);
    });
  },
  //init: () => {AsyncStorage.setItem('user-language', 'hy')},language
  init: () => {},
  cacheUserLanguage: language => {
    //AsyncStorage.setItem('user-language', 'en');
    AsyncStorage.setItem('user-language', language);
  },
};
i18n
  .use(LANGUAGE_DETECTOR)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en,
      },
      hy: {
        translation: hy,
      },
      ru: {
        translation: ru,
      },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
