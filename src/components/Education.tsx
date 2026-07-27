import React from 'react'
import { useLanguage } from '../i18n/LanguageContext'

interface EducationItem {
  id: string
  period: string
  institution: string
  location: string
  degree: string
  field: string
  status: string
}

const Education: React.FC = () => {
  const { language, translations } = useLanguage()
  const education: EducationItem[] = translations.education.items
  return (
    <section className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {education.map((edu, index) => (
          <div 
            key={edu.id} 
            className="bg-white/10 dark:bg-slate-200/50 backdrop-blur-sm rounded-xl border border-white/10 dark:border-slate-200 p-5 hover:bg-white/5 dark:hover:bg-slate-300/50 transition-colors duration-300 animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-white dark:text-slate-800 truncate">{edu.institution}</h3>
                <p className="text-white/60 dark:text-slate-600 text-sm">{edu.location}</p>
              </div>
              <span className="px-3 py-1 bg-cyan-500/20 dark:bg-cyan-200/20 text-cyan-400 dark:text-cyan-700 text-xs font-medium rounded-full whitespace-nowrap">
                {edu.status}
              </span>
            </div>
            
            <div className="space-y-2">
              {edu.degree && (
                <div className="flex items-center gap-2 text-white/80 dark:text-slate-700">
                  <svg className="w-4 h-4 text-cyan-400 dark:text-cyan-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span className="text-sm">{edu.degree}{edu.field ? ` ${language === 'cs' ? 'v' : 'in'} ${edu.field}` : ''}</span>
                </div>
              )}
              <p className="text-white/50 dark:text-slate-400 text-xs">{edu.period}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Education
