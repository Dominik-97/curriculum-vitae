import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Language, Translations, translations } from './index';

// Define the context type
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, defaultValue?: string) => string;
  translations: Translations;
}

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Custom hook to use the language context
export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Helper function to get nested translation value
function getTranslationValue(translations: Translations, key: string): string | undefined {
  const keys = key.split('.');
  let value: any = translations;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return undefined;
    }
  }
  
  return typeof value === 'string' ? value : undefined;
}

// Provider component
interface LanguageProviderProps {
  children: ReactNode;
  defaultLanguage?: Language;
}

export function LanguageProvider({ 
  children, 
  defaultLanguage = 'en' 
}: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(defaultLanguage);

  // Load saved language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language | null;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'cs')) {
      setLanguageState(savedLanguage);
    }
  }, []);

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
    // Update HTML lang attribute
    document.documentElement.lang = language;
  }, [language]);

  // Set language function
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  // Translation function - handles nested keys like "header.title"
  const t = (key: string, defaultValue: string = key): string => {
    const currentTranslations = translations[language];
    const value = getTranslationValue(currentTranslations, key);
    return value || defaultValue;
  };

  // Get translations object for the current language
  const getTranslations = (): Translations => {
    return translations[language];
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
    translations: getTranslations(),
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export { LanguageContext };
