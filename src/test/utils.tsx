import type { ReactElement } from 'react'
import { render, type RenderResult } from '@testing-library/react'
import { LanguageProvider } from '../i18n/LanguageContext.ts'

/**
 * Renders a component wrapped in the LanguageProvider. Pass `language` to start
 * in a specific locale (defaults to English). localStorage is cleared between
 * tests (see setup.ts), so `defaultLanguage` is always honored on first render.
 */
export function renderWithLanguage(
  ui: ReactElement,
  language: 'en' | 'cs' = 'en'
): RenderResult {
  return render(<LanguageProvider defaultLanguage={language}>{ui}</LanguageProvider>)
}
