import React from 'react'
import { useLanguage } from '../i18n/LanguageContext.ts'

const InterestedIn: React.FC = () => {
  const { t, translations } = useLanguage()
  const interests = translations.interestedIn.items

  return (
    <section className="bg-white/10 dark:bg-slate-200/50 backdrop-blur-sm rounded-xl border border-white/10 dark:border-slate-200 p-6 sm:p-8 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-hermes-400"></span>
        {t('interestedIn.title')}
      </h2>
      <div className="flex flex-wrap gap-2">
        {interests.map((interest, index) => (
          <span 
            key={index}
            className="px-4 py-2 bg-hermes-500/10 dark:bg-hermes-200/20 text-hermes-400 dark:text-hermes-700 rounded-full text-sm border border-hermes-500/20 dark:border-hermes-300/20"
          >
            {interest}
          </span>
        ))}
      </div>
    </section>
  )
}

export default InterestedIn
