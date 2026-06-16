import { STORAGE_KEYS, DEFAULT_LANGUAGE, type Language } from '@/shared/constants/api';

export function getStoredLanguage(): Language {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;
  const stored = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
  if (stored === 'en' || stored === 'ar') return stored;
  return DEFAULT_LANGUAGE;
}
