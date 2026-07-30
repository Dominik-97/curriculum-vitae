import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithLanguage } from '../test/utils'
import en from '../i18n/locales/en.json'
import Skills from './Skills'

describe('<Skills />', () => {
  it('renders every skill category as a card, in order', () => {
    renderWithLanguage(<Skills />)
    const headings = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent)
    expect(headings).toEqual(en.skills.categories.map((c) => c.title))
  })

  it('renders representative skills across categories', () => {
    renderWithLanguage(<Skills />)
    for (const skill of ['HTMX', 'Docker', 'Go', 'Ethical AI Usage']) {
      expect(screen.getByText(skill)).toBeTruthy()
    }
  })
})
