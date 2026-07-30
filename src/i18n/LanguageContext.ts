import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Language, Translations, translations } from './index';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, defaultValue?: string) => string;
  translations: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

function getTranslationValue(translations: Translations, key: string): string | undefined {
  const keys = key.split('.');
  let value: unknown = translations;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      return undefined;
    }
  }
  
  return typeof value === 'string' ? value : undefined;
}

interface LanguageProviderProps {
  children: ReactNode;
  defaultLanguage?: Language;
}

export function LanguageProvider({
  children,
  defaultLanguage,
}: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language') as Language | null;
    if (savedLanguage === 'en' || savedLanguage === 'cs') {
      return savedLanguage;
    }
    // An explicit prop wins over auto-detection (used in tests / embeds).
    if (defaultLanguage) {
      return defaultLanguage;
    }
    // Otherwise detect from the browser: Czech (and Slovak) visitors get Czech.
    const nav = (navigator.language || '').toLowerCase();
    if (nav.startsWith('cs') || nav.startsWith('sk')) {
      return 'cs';
    }
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string, defaultValue: string = key): string => {
    const currentTranslations = translations[language];
    const value = getTranslationValue(currentTranslations, key);
    return value || defaultValue;
  };

  const getTranslations = (): Translations => {
    return translations[language];
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
    translations: getTranslations(),
  };

  return React.createElement(
    LanguageContext.Provider,
    { value },
    children
  );
}

export { LanguageContext };
