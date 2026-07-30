import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithLanguage } from '../test/utils'
import en from '../i18n/locales/en.json'
import CVPage from './CVPage'

describe('<CVPage />', () => {
  it('composes the header, all sections and the floating controls', () => {
    renderWithLanguage(<CVPage />)

    expect(screen.getByRole('heading', { level: 1 }).textContent).toContain('Dominik')

    for (const title of [
      en.about.title,
      en.experience.title,
      en.education.title,
      en.skills.title,
      en.languages.title,
      en.somethingMore.title,
      en.interestedIn.title,
    ]) {
      expect(screen.getByRole('heading', { name: title })).toBeTruthy()
    }

    expect(screen.getByRole('button', { name: 'Toggle theme' })).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Print CV' })).toBeTruthy()
  })
})
