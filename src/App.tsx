import React from 'react'
import { LanguageProvider } from './i18n/LanguageContext.ts'
import CVPage from './pages/CVPage'
import HealthCheck from './components/HealthCheck'
import Analytics from './components/Analytics'

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <HealthCheck />
      <Analytics />
      <div className="min-h-screen bg-midnight-500 dark:bg-gray-50 text-white dark:text-slate-800 transition-colors duration-500">
      <div className="fixed inset-0 bg-gradient-to-br from-midnight-500 via-midnight-600 to-midnight-500 dark:from-gray-50 dark:via-gray-100 dark:to-gray-50 pointer-events-none"></div>
      
      <div 
        className="fixed inset-0 opacity-10 pointer-events-none dark:opacity-0"
        style={{
          backgroundImage: "linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)",
          backgroundSize: "50px 50px"
        }}
      ></div>
      
      <div className="relative z-10">
        <CVPage />
      </div>
    </div>
    </LanguageProvider>
  )
}

export default App
