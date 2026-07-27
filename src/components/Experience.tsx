import React, { useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

interface ExperienceItem {
  id: string
  period: string
  company: string
  position: string
  type: string
  location?: string
  description: string[]
  technologies?: string[]
}

const Experience: React.FC = () => {
  const { translations } = useLanguage()
  const experiences: ExperienceItem[] = translations.experience.items
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <section className="space-y-6">
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div 
            key={exp.id} 
            className="bg-white/10 dark:bg-slate-200/50 backdrop-blur-sm rounded-xl border border-white/10 dark:border-slate-200 hover:border-hermes-500/30 dark:hover:border-hermes-400/30 transition-all duration-500 overflow-hidden animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Header with expand/collapse */}
            <button
              onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
              className="w-full p-5 text-left flex flex-wrap items-center justify-between gap-4 hover:bg-white/5 dark:hover:bg-slate-300/50 transition-colors duration-300"
            >
              <div className="flex flex-wrap items-center gap-4 min-w-0 flex-1">
                {/* Period badge */}
                <span className="px-3 py-1 bg-hermes-500/20 dark:bg-hermes-200/20 text-hermes-400 dark:text-hermes-700 text-xs font-medium rounded-full whitespace-nowrap">
                  {exp.period}
                </span>
                
                {/* Company and position */}
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-white dark:text-slate-800 truncate">{exp.company}</h3>
                  <p className="text-white/60 dark:text-slate-600 text-sm">{exp.position}</p>
                </div>
              </div>
              
              {/* Type and location */}
              <div className="flex items-center gap-3">
                <span className="text-white/50 dark:text-slate-500 text-sm hidden sm:block">{exp.type}</span>
                {exp.location && <span className="text-white/40 dark:text-slate-400 text-sm hidden lg:block">| {exp.location}</span>}
                
                {/* Expand/Collapse icon */}
                <svg 
                  className={`w-5 h-5 text-hermes-400 dark:text-hermes-600 transition-transform duration-300 ${expandedId === exp.id ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>
            
            {/* Expandable content */}
            {expandedId === exp.id && (
              <div className="p-5 pt-0 animate-fade-in">
                {/* Technologies tags */}
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {exp.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-3 py-1 bg-hermes-500/10 dark:bg-hermes-200/20 text-hermes-400 dark:text-hermes-700 text-xs rounded-full border border-hermes-500/20 dark:border-hermes-300/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* Description */}
                <ul className="space-y-2 text-white/70 dark:text-slate-600 text-sm leading-relaxed">
                  {exp.description.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-hermes-500/50 dark:text-hermes-500/50 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Experience
