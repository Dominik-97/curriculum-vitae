import React from 'react'

interface Language {
  id: string
  name: string
  proficiency: string
  level: number
}

const languages: Language[] = [
  { id: 'cz', name: 'Czech', proficiency: 'Native', level: 100 },
  { id: 'en', name: 'English', proficiency: 'Full Professional Proficiency', level: 95 },
  { id: 'es', name: 'Spanish', proficiency: 'Elementary', level: 30 },
  { id: 'de', name: 'German', proficiency: 'Elementary', level: 25 },
]

const Languages: React.FC = () => {
  return (
    <section className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {languages.map((lang, index) => (
          <div 
            key={lang.id} 
            className="bg-white/10 dark:bg-slate-200/50 backdrop-blur-sm rounded-xl border border-white/10 dark:border-slate-200 p-5 hover:bg-white/5 dark:hover:bg-slate-300/50 transition-colors duration-300 animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{lang.id === 'cz' ? '🇨🇿' : lang.id === 'en' ? '🇬🇧' : lang.id === 'es' ? '🇪🇸' : '🇩🇪'}</span>
                <div>
                  <h3 className="text-lg font-semibold text-white dark:text-slate-800">{lang.name}</h3>
                  <p className="text-white/50 dark:text-slate-500 text-sm">{lang.proficiency}</p>
                </div>
              </div>
              
              {/* Proficiency bar */}
              <div className="w-32 h-2 bg-white/10 dark:bg-slate-300 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-hermes-500 to-cyan-400 rounded-full transition-all duration-1000"
                  style={{ width: `${lang.level}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Languages
