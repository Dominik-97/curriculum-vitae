import React from 'react'

const PrintButton: React.FC = () => {
  const handlePrint = () => {
    window.print()
  }

  return (
    <button
      onClick={handlePrint}
      className="no-print fixed bottom-6 right-24 z-50 w-12 h-12 bg-white/10 dark:bg-slate-200/80 backdrop-blur-xl rounded-xl border border-white/20 dark:border-slate-300 flex items-center justify-center hover:bg-white/20 dark:hover:bg-slate-300 transition-all duration-500 shadow-hermes group"
      aria-label="Print CV"
    >
      <svg className="w-5 h-5 text-white/70 dark:text-slate-600 group-hover:text-hermes-400 dark:group-hover:text-hermes-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2V9a2 2 0 00-2-2H9a2 2 0 00-2 2v10a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
      </svg>
    </button>
  )
}

export default PrintButton
