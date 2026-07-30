import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithLanguage } from '../test/utils'
import en from '../i18n/locales/en.json'
import About from './About'

describe('<About />', () => {
  it('renders the section title and every description paragraph', () => {
    renderWithLanguage(<About />)
    expect(screen.getByRole('heading', { name: en.about.title })).toBeTruthy()
    for (const paragraph of en.about.description) {
      expect(screen.getByText(paragraph)).toBeTruthy()
    }
  })

  it('renders every specialization chip', () => {
    renderWithLanguage(<About />)
    for (const skill of en.about.specializations) {
      expect(screen.getByText(skill)).toBeTruthy()
    }
  })
})
