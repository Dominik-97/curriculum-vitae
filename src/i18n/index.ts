import en from './locales/en.json';
import cs from './locales/cs.json';

export type Language = 'en' | 'cs';

export type Translations = typeof en;

const translations: Record<Language, Translations> = {
  en,
  cs,
};

export { translations };
