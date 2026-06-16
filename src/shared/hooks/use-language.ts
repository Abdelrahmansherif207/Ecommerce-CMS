import { useSyncExternalStore } from 'react';
import i18n from 'i18next';
import { STORAGE_KEYS, DEFAULT_LANGUAGE, type Language } from '@/shared/constants/api';

function getStoredLanguage(): Language {
  const stored = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
  if (stored === 'en' || stored === 'ar') return stored;
  return DEFAULT_LANGUAGE;
}

let currentLanguage: Language = getStoredLanguage();
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): Language {
  return currentLanguage;
}

export function setLanguage(lang: Language) {
  currentLanguage = lang;
  localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lang;
  i18n.changeLanguage(lang);
  listeners.forEach((listener) => listener());
}

export function useLanguage() {
  const language = useSyncExternalStore(subscribe, getSnapshot);

  return {
    language,
    isRTL: language === 'ar',
    setLanguage,
  };
}
