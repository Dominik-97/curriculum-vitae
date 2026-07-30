import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithLanguage } from '../test/utils'
import en from '../i18n/locales/en.json'
import Footer from './Footer'

describe('<Footer />', () => {
  it('renders the "last updated" label followed by the build date', () => {
    renderWithLanguage(<Footer />)
    // The label is followed by the injected build date, so match the <p> that
    // starts with the label and has extra text after it.
    const updated = screen.getByText((_, el) => {
      if (el?.tagName !== 'P') return false
      const text = el.textContent ?? ''
      return text.startsWith(en.footer.lastUpdated) && text.length > en.footer.lastUpdated.length
    })
    expect(updated).toBeTruthy()
    expect(screen.getByText(en.footer.builtWith)).toBeTruthy()
  })

  it('links to GitHub and LinkedIn, opening in a new tab', () => {
    renderWithLanguage(<Footer />)
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(2)
    const hrefs = links.map((l) => l.getAttribute('href') ?? '')
    expect(hrefs.some((h) => h.includes('github.com'))).toBe(true)
    expect(hrefs.some((h) => h.includes('linkedin.com'))).toBe(true)
    for (const link of links) {
      expect(link.getAttribute('target')).toBe('_blank')
      expect(link.getAttribute('rel')).toContain('noopener')
    }
  })
})
