import React from 'react'
import { useLanguage } from '../i18n/LanguageContext.ts'

const SomethingMore: React.FC = () => {
  const { t } = useLanguage()
  return (
    <section className="bg-white/10 dark:bg-slate-200/50 backdrop-blur-sm rounded-xl border border-white/10 dark:border-slate-200 p-6 sm:p-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
        {t('somethingMore.title')}
      </h2>
      <p className="text-white/70 dark:text-slate-600 leading-relaxed">
        {t('somethingMore.description')}
      </p>
    </section>
  )
}

export default SomethingMore
