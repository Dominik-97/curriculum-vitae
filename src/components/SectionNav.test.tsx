import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithLanguage } from '../test/utils'
import en from '../i18n/locales/en.json'
import SectionNav from './SectionNav'

describe('<SectionNav />', () => {
  it('renders a labelled nav with a link per section and a back-to-top button', () => {
    renderWithLanguage(<SectionNav />)

    expect(screen.getByRole('navigation', { name: en.a11y.sectionNav })).toBeTruthy()

    for (const title of [
      en.about.title,
      en.experience.title,
      en.education.title,
      en.skills.title,
      en.languages.title,
    ]) {
      expect(screen.getByRole('link', { name: title })).toBeTruthy()
    }

    expect(screen.getByRole('button', { name: en.a11y.backToTop })).toBeTruthy()
  })
})
