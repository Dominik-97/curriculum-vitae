import React, { useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext.ts'
import Header from '../components/Header'
import About from '../components/About'
import Experience from '../components/Experience'
import Education from '../components/Education'
import Skills from '../components/Skills'
import Languages from '../components/Languages'
import Footer from '../components/Footer'
import ThemeToggle from '../components/ThemeToggle'
import PrintButton from '../components/PrintButton'
import SomethingMore from '../components/SomethingMore'
import InterestedIn from '../components/InterestedIn'
import PDFDownload from '../components/PDFDownload'
import SectionNav from '../components/SectionNav'

const CVPage: React.FC = () => {
  const { t } = useLanguage()
  const [isPrinting, setIsPrinting] = useState<boolean>(false)
  
  const handleBeforePrint = () => {
    setIsPrinting(true)
  }
  
  const handleAfterPrint = () => {
    setIsPrinting(false)
  }
  
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <a
        href="#main-content"
        className="no-print sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-hermes-500 focus:text-white"
      >
        {t('a11y.skipToContent')}
      </a>
      <ThemeToggle />
      <PrintButton onBeforePrint={handleBeforePrint} onAfterPrint={handleAfterPrint} />
      <SectionNav />

      <div className="relative">
        <div className="absolute inset-0 bg-hermes-gradient rounded-3xl opacity-10 blur-3xl"></div>
        
        <div className="relative bg-midnight-600/80 dark:bg-white/80 backdrop-blur-xl rounded-3xl border border-white/10 dark:border-gray-200 shadow-hermes-lg overflow-hidden">
          
          <Header />

          <main id="main-content" className="p-6 sm:p-8 lg:p-12">

            {/* About Section */}
            <section id="about" className="mb-12 scroll-mt-24">
              <About />
              <PDFDownload />
            </section>

            {/* Experience Section */}
            <section id="experience" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-hermes-500"></span>
                {t('experience.title')}
              </h2>
              <Experience forceExpandAll={isPrinting} />
            </section>
            
            {/* Education Section */}
            <section id="education" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-hermes-400"></span>
                {t('education.title')}
              </h2>
              <Education />
            </section>
            
            {/* Skills Section */}
            <section id="skills" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-hermes-300"></span>
                {t('skills.title')}
              </h2>
              <Skills />
            </section>
            
            {/* Languages Section */}
            <section id="languages" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                {t('languages.title')}
              </h2>
              <Languages />
            </section>
            
            {/* Additional sections*/}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
              <SomethingMore />
              <InterestedIn />
            </div>
            
            <Footer />
          </main>
        </div>
      </div>
    </div>
  )
}

export default CVPage
