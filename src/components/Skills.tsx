import React from 'react'
import { useLanguage } from '../i18n/LanguageContext'

interface SkillCategory {
  id: string
  title: string
  icon: string
  items: string[]
}

const iconMap: Record<string, JSX.Element> = {
  code: (
    <svg className="w-5 h-5 text-hermes-400 dark:text-hermes-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  briefcase: (
    <svg className="w-5 h-5 text-hermes-400 dark:text-hermes-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  trending: (
    <svg className="w-5 h-5 text-hermes-400 dark:text-hermes-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  heart: (
    <svg className="w-5 h-5 text-hermes-400 dark:text-hermes-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
}

const Skills: React.FC = () => {
  const { translations } = useLanguage()
  const skills: SkillCategory[] = translations.skills.categories

  return (
    <section className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((category, catIndex) => (
          <div 
            key={category.id}
            className="bg-white/10 dark:bg-slate-200/50 backdrop-blur-sm rounded-xl border border-white/10 dark:border-slate-200 p-6 animate-fade-in-up"
            style={{ animationDelay: `${catIndex * 100}ms` }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-hermes-500/20 dark:bg-hermes-200/20 rounded-lg flex items-center justify-center">
                {iconMap[category.icon] || iconMap.code}
              </div>
              <h3 className="text-lg font-semibold text-white dark:text-slate-800">{category.title}</h3>
            </div>
            
            {/* Skill tags */}
            <div className="flex flex-wrap gap-2">
              {category.items.map((skill, skillIndex) => (
                <span 
                  key={skillIndex}
                  className="px-3 py-1.5 bg-white/5 dark:bg-slate-300/50 hover:bg-white/10 dark:hover:bg-slate-400/50 rounded-lg text-white/80 dark:text-slate-700 text-sm border border-white/10 dark:border-slate-200 transition-colors duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills
