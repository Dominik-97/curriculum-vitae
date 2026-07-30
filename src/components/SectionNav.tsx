import React, { useEffect, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext.ts'

const SECTIONS = [
  { id: 'about', labelKey: 'about.title' },
  { id: 'experience', labelKey: 'experience.title' },
  { id: 'education', labelKey: 'education.title' },
  { id: 'skills', labelKey: 'skills.title' },
  { id: 'languages', labelKey: 'languages.title' },
] as const

const SectionNav: React.FC = () => {
  const { t } = useLanguage()
  const [active, setActive] = useState<string>(SECTIONS[0].id)
  const [showTop, setShowTop] = useState(false)

  // Scroll-spy: highlight the section currently near the middle of the viewport.
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    )
    SECTIONS.map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null)
      .forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Reveal the back-to-top button once the user has scrolled a bit.
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const jumpTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <>
      <nav
        aria-label={t('a11y.sectionNav')}
        className="no-print hidden lg:flex flex-col gap-3 fixed left-6 top-1/2 -translate-y-1/2 z-40"
      >
        {SECTIONS.map((s) => {
          const label = t(s.labelKey)
          const isActive = active === s.id
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={jumpTo(s.id)}
              aria-label={label}
              aria-current={isActive ? 'true' : undefined}
              title={label}
              className="group flex items-center gap-3"
            >
              <span
                className={`w-3 h-3 rounded-full border transition-all duration-300 ${
                  isActive
                    ? 'bg-hermes-500 border-hermes-400 scale-125'
                    : 'bg-transparent border-white/30 dark:border-slate-400 group-hover:border-hermes-400'
                }`}
              />
              <span className="text-xs text-transparent group-hover:text-white/70 dark:group-hover:text-slate-600 transition-colors duration-300 whitespace-nowrap">
                {label}
              </span>
            </a>
          )
        })}
      </nav>

      <button
        type="button"
        onClick={scrollToTop}
        aria-label={t('a11y.backToTop')}
        className={`no-print fixed bottom-6 left-6 z-50 w-12 h-12 bg-white/10 dark:bg-slate-200/80 backdrop-blur-xl rounded-xl border border-white/20 dark:border-slate-300 flex items-center justify-center hover:bg-white/20 dark:hover:bg-slate-300 transition-all duration-300 shadow-hermes ${
          showTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <svg className="w-5 h-5 text-white/70 dark:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </>
  )
}

export default SectionNav
