import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithLanguage } from '../test/utils'
import en from '../i18n/locales/en.json'
import SomethingMore from './SomethingMore'

describe('<SomethingMore />', () => {
  it('renders the title and description', () => {
    renderWithLanguage(<SomethingMore />)
    expect(screen.getByRole('heading', { name: en.somethingMore.title })).toBeTruthy()
    expect(screen.getByText(en.somethingMore.description)).toBeTruthy()
  })
})
