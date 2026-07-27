import React from 'react'
import { useLanguage } from '../i18n/LanguageContext.ts'
import meImage from '../assets/Me.png'

const Header: React.FC = () => {
  const { t, language, setLanguage } = useLanguage()

  const handleLanguageChange = (lang: 'en' | 'cs') => {
    setLanguage(lang)
  }
  return (
    <div className="relative p-8 sm:p-12 lg:p-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-hermes-600/20 via-hermes-500/10 to-transparent dark:from-hermes-100/20 dark:via-hermes-50/10 dark:to-transparent"></div>
      
      <div className="absolute inset-0 opacity-20 dark:opacity-10">
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2 border border-hermes-500/20 dark:border-hermes-300/20 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 border border-hermes-400/10 dark:border-hermes-200/10 rounded-full"></div>
      </div>
      
      <div className="relative z-10">
        <div className="max-w-4xl pr-40 sm:pr-52 lg:pr-60">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-hermes-gradient bg-clip-text text-transparent dark:text-slate-800">
            {t('header.name')}
          </h1>
          
          <p className="text-xl sm:text-2xl lg:text-3xl text-white/90 dark:text-slate-700 mb-4">
            {t('header.title')}
          </p>
          
          <p className="text-lg sm:text-xl text-white/70 dark:text-slate-600 mb-8">
            {t('header.subtitle')}
            <span className="hermes-gradient-text dark:text-hermes-600 dark:font-medium print-tagline">{t('header.tagline')}</span>
          </p>
          
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <a 
              href="mailto:dominikbalint@email.cz" 
              className="px-4 py-2 bg-white/10 dark:bg-slate-200/80 hover:bg-white/20 dark:hover:bg-slate-300 backdrop-blur-sm rounded-lg text-white/90 dark:text-slate-700 hover:text-white dark:hover:text-slate-800 transition-all duration-300 border border-white/20 dark:border-slate-300 text-sm font-medium"
            >
              dominikbalint@email.cz
            </a>
            <a 
              href="https://github.com/Dominik-97" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/10 dark:bg-slate-200/80 hover:bg-white/20 dark:hover:bg-slate-300 backdrop-blur-sm rounded-lg text-white/90 dark:text-slate-700 hover:text-white dark:hover:text-slate-800 transition-all duration-300 border border-white/20 dark:border-slate-300 text-sm font-medium flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
              </svg>
              GitHub
            </a>
            <button
              onClick={() => handleLanguageChange('cs')}
              onMouseDown={(e) => e.preventDefault()}
              className={`px-4 py-2 rounded-lg text-sm font-medium appearance-none outline-none ring-0 shadow-none focus:outline-none focus:ring-0 focus:shadow-none ${
                language === 'cs' 
                  ? 'bg-hermes-500/30 dark:bg-hermes-300 text-hermes-300 dark:text-hermes-800 border border-hermes-500/30 dark:border-hermes-300' 
                  : 'bg-hermes-500/20 dark:bg-hermes-200/80 hover:bg-hermes-500/30 dark:hover:bg-hermes-300/80 text-hermes-400 dark:text-hermes-700 hover:text-hermes-300 dark:hover:text-hermes-800 transition-colors duration-300'
              }`}
              aria-label="Switch to Czech"
            >
              {t('buttons.czech')}
            </button>
            <button
              onClick={() => handleLanguageChange('en')}
              onMouseDown={(e) => e.preventDefault()}
              className={`px-4 py-2 rounded-lg text-sm font-medium appearance-none outline-none ring-0 shadow-none focus:outline-none focus:ring-0 focus:shadow-none ${
                language === 'en' 
                  ? 'bg-hermes-500/30 dark:bg-hermes-300 text-hermes-300 dark:text-hermes-800 border border-hermes-500/30 dark:border-hermes-300' 
                  : 'bg-hermes-500/20 dark:bg-hermes-200/80 hover:bg-hermes-500/30 dark:hover:bg-hermes-300/80 text-hermes-400 dark:text-hermes-700 hover:text-hermes-300 dark:hover:text-hermes-800 transition-colors duration-300'
              }`}
              aria-label="Switch to English"
            >
              {t('buttons.english')}
            </button>
          </div>
        </div>
      </div>
      
      <div className="absolute right-8 top-8 sm:right-12 sm:top-12 w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48">
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-hermes-500/20 rounded-full blur-2xl animate-pulse-soft dark:bg-hermes-500/10"></div>
          
          <div className="relative w-full h-full bg-gradient-to-br from-hermes-600/20 to-hermes-400/10 dark:from-hermes-200/20 dark:to-hermes-100/10 rounded-full border border-hermes-500/30 dark:border-hermes-300/30 backdrop-blur-xl flex items-center justify-center overflow-hidden">
            <img 
              src={meImage} 
              alt="Dominik Balint" 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full border-2 border-midnight-500 dark:border-white animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

export default Header
