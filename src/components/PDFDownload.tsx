import React, { useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext.ts'

const PDFDownload: React.FC = () => {
  const { t } = useLanguage()
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className="mt-10 pt-6 border-t border-white/10 dark:border-slate-200 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-lg font-medium text-white dark:text-slate-800">{t('pdfDownload.title')}</h3>
        <div className="relative inline-block">
          <button
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="text-white/60 dark:text-slate-500 hover:text-hermes-400 dark:hover:text-hermes-600 transition-colors"
            aria-label={t('pdfDownload.infoText')}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          {showTooltip && (
            <div
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-midnight-600 dark:bg-white rounded-lg shadow-lg text-xs text-white/80 dark:text-slate-700 z-50"
            >
              {t('pdfDownload.infoText')}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-3 sm:gap-4">
        <a
          href="https://github.com/Dominik-97/curriculum-vitae/releases/latest/download/cv_en.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-white/10 dark:bg-slate-200/80 hover:bg-white/20 dark:hover:bg-slate-300 backdrop-blur-sm rounded-lg text-white/90 dark:text-slate-700 hover:text-white dark:hover:text-slate-800 transition-all duration-300 border border-white/20 dark:border-slate-300 text-sm font-medium flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
          </svg>
          {t('pdfDownload.english')}
        </a>
        <a
          href="https://github.com/Dominik-97/curriculum-vitae/releases/latest/download/cv_cz.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-white/10 dark:bg-slate-200/80 hover:bg-white/20 dark:hover:bg-slate-300 backdrop-blur-sm rounded-lg text-white/90 dark:text-slate-700 hover:text-white dark:hover:text-slate-800 transition-all duration-300 border border-white/20 dark:border-slate-300 text-sm font-medium flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
          </svg>
          {t('pdfDownload.czech')}
        </a>
        <a
          href="/dominik-balint.vcf"
          download
          className="px-4 py-2 bg-white/10 dark:bg-slate-200/80 hover:bg-white/20 dark:hover:bg-slate-300 backdrop-blur-sm rounded-lg text-white/90 dark:text-slate-700 hover:text-white dark:hover:text-slate-800 transition-all duration-300 border border-white/20 dark:border-slate-300 text-sm font-medium flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          {t('pdfDownload.vcard')}
        </a>
      </div>
    </div>
  )
}

export default PDFDownload
