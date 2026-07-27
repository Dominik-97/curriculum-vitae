import React from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import Header from './Header'
import About from './About'
import Experience from './Experience'
import Education from './Education'
import Skills from './Skills'
import Languages from './Languages'
import Footer from './Footer'
import ThemeToggle from './ThemeToggle'
import PrintButton from './PrintButton'
import SomethingMore from './SomethingMore'
import InterestedIn from './InterestedIn'

const CVPage: React.FC = () => {
  const { t } = useLanguage()
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Floating action buttons */}
      <ThemeToggle />
      <PrintButton />
      
      {/* Main container with Hermes-inspired glass card */}
      <div className="relative">
        {/* Decorative glow effect */}
        <div className="absolute inset-0 bg-hermes-gradient rounded-3xl opacity-10 blur-3xl"></div>
        
        {/* Main card with glass effect */}
        <div className="relative bg-midnight-600/80 dark:bg-white/80 backdrop-blur-xl rounded-3xl border border-white/10 dark:border-gray-200 shadow-hermes-lg overflow-hidden">
          
          {/* Header with gradient */}
          <Header />
          
          {/* Main content area */}
          <div className="p-6 sm:p-8 lg:p-12">
            
            {/* About Section */}
            <section className="mb-12">
              <About />
            </section>
            
            {/* Experience Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-hermes-500"></span>
                {t('experience.title')}
              </h2>
              <Experience />
            </section>
            
            {/* Education Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-hermes-400"></span>
                {t('education.title')}
              </h2>
              <Education />
            </section>
            
            {/* Skills Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-hermes-300"></span>
                {t('skills.title')}
              </h2>
              <Skills />
            </section>
            
            {/* Languages Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                {t('languages.title')}
              </h2>
              <Languages />
            </section>
            
            {/* Additional sections - design focused */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
              <SomethingMore />
              <InterestedIn />
            </div>
            
            <Footer />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CVPage
