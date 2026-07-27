import React from 'react'
import { useLanguage } from '../i18n/LanguageContext.ts'

const About: React.FC = () => {
  const { t, translations } = useLanguage()
  const specializations = translations.about.specializations
  const description = translations.about.description

  return (
    <section className="animate-fade-in-up">
      <h2 className="text-xl font-medium text-white/80 dark:text-slate-700 mb-4">{t('about.title')}</h2>
      
      <div className="space-y-6 text-white/70 dark:text-slate-600 leading-relaxed">
        {description.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-medium text-white dark:text-slate-800 mb-4">{t('about.specializedIn')}</h3>
        <div className="flex flex-wrap gap-3">
          {specializations.map((skill, index) => (
            <span 
              key={index}
              className="px-4 py-2 bg-white/10 dark:bg-slate-200/80 hover:bg-white/20 dark:hover:bg-slate-300 backdrop-blur-sm rounded-full text-white/80 dark:text-slate-700 hover:text-white dark:hover:text-slate-800 transition-all duration-300 border border-white/20 dark:border-slate-300 text-sm font-medium animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
