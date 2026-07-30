import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithLanguage } from '../test/utils'
import en from '../i18n/locales/en.json'
import InterestedIn from './InterestedIn'

describe('<InterestedIn />', () => {
  it('renders the title and every interest', () => {
    renderWithLanguage(<InterestedIn />)
    expect(screen.getByRole('heading', { name: en.interestedIn.title })).toBeTruthy()
    for (const item of en.interestedIn.items) {
      expect(screen.getByText(item)).toBeTruthy()
    }
  })
})
