import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithLanguage } from '../test/utils'
import en from '../i18n/locales/en.json'
import Languages from './Languages'

describe('<Languages />', () => {
  it('renders each language with its name, proficiency and flag', () => {
    renderWithLanguage(<Languages />)

    expect(screen.getByText(en.languages.names.cz)).toBeTruthy()
    expect(screen.getByText(en.languages.names.en)).toBeTruthy()
    expect(screen.getByText(en.languages.names.it)).toBeTruthy()

    expect(screen.getByText(en.languages.proficiencies.native)).toBeTruthy()
    expect(screen.getByText(en.languages.proficiencies.full_professional)).toBeTruthy()
    expect(screen.getByText(en.languages.proficiencies.learning)).toBeTruthy()

    expect(screen.getByText('🇨🇿')).toBeTruthy()
    expect(screen.getByText('🇬🇧')).toBeTruthy()
    expect(screen.getByText('🇮🇹')).toBeTruthy()
  })
})
