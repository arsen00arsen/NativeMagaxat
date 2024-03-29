import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNLocalize from 'react-native-localize';
import en from './translations/en';
import hy from './translations/hy';
const LANGUAGES = {hy, en};
//const LANGUAGES = {hy};
//const LANG_CODES = Object.keys(LANGUAGES);
//AsyncStorage.removeItem('user-language');
const LANGUAGE_DETECTOR = {
  type: 'languageDetector',
  async: true,
  detect: callback => {
    AsyncStorage.getItem('user-language', (err, language) => {
      if (err || !language) {
        callback('hy');
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
    //AsyncStorage.setItem('user-language', 'hy');
    AsyncStorage.setItem('user-language', language);
  },
};
i18n
  .use(LANGUAGE_DETECTOR)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: LANGUAGES,
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
  });
