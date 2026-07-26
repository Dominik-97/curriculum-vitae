import React, { useEffect, useState } from 'react'

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme) {
      setTheme(savedTheme)
    } else if (prefersDark) {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }, [])

  useEffect(() => {
    // Apply theme to document
    const root = window.document.documentElement
    
    if (theme === 'dark') {
      root.classList.add('dark')
      root.setAttribute('data-theme', 'dark')
    } else {
      root.classList.remove('dark')
      root.setAttribute('data-theme', 'light')
    }
    
    // Save preference
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return (
    <button
      onClick={toggleTheme}
      className="no-print fixed bottom-6 right-6 z-50 w-14 h-7 bg-white/10 dark:bg-slate-200/80 backdrop-blur-xl rounded-full border border-white/20 dark:border-slate-300 flex items-center justify-between p-1 hover:bg-white/20 dark:hover:bg-slate-300 transition-all duration-500 shadow-hermes"
      aria-label="Toggle theme"
    >
      {/* Dark mode icon */}
      <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-500 ${theme === 'dark' ? 'bg-hermes-500 text-white' : 'text-white/60 dark:text-slate-600'}`}>
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </div>
      
      {/* Light mode icon */}
      <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-500 ${theme === 'light' ? 'bg-yellow-400 text-white' : 'text-white/60 dark:text-slate-600'}`}>
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd" />
        </svg>
      </div>
      
      {/* Toggle circle */}
      <div 
        className={`absolute w-5 h-5 bg-white dark:bg-slate-800 rounded-full transition-all duration-500 shadow-md ${theme === 'dark' ? 'translate-x-7' : 'translate-x-1'}`}
        style={{ top: '1px', left: '1px' }}
      ></div>
    </button>
  )
}

export default ThemeToggle
