import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en/translation.json';
import arTranslation from './locales/ar/translation.json';
import { STORAGE_KEYS, DEFAULT_LANGUAGE } from '@/shared/constants/api';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslation },
    ar: { translation: arTranslation },
  },
  lng: localStorage.getItem(STORAGE_KEYS.LANGUAGE) || DEFAULT_LANGUAGE,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
