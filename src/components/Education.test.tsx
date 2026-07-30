import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithLanguage } from '../test/utils'
import en from '../i18n/locales/en.json'
import cs from '../i18n/locales/cs.json'
import Education from './Education'

describe('<Education />', () => {
  it('renders one card per education item', () => {
    renderWithLanguage(<Education />)
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(
      en.education.items.length
    )
  })

  it('shows institutions, statuses and English degree formatting', () => {
    renderWithLanguage(<Education />)
    // Degree + field joined with the English connector "in".
    expect(screen.getByText('Mgr. in Corporate Law')).toBeTruthy()
    expect(screen.getByText('Bc. in Corporate Law')).toBeTruthy()
    // Item with an empty field renders the degree with no connector.
    expect(screen.getByText('High School Diploma')).toBeTruthy()
    expect(screen.getAllByText('CEVRO Institut')).toHaveLength(2)
    expect(screen.getByText('Mensa Gymnázium')).toBeTruthy()
    expect(screen.getByText('Incomplete')).toBeTruthy()
    expect(screen.getAllByText('Completed')).toHaveLength(2)
  })

  it('uses the Czech connector "v" when rendered in Czech', () => {
    renderWithLanguage(<Education />, 'cs')
    const item = cs.education.items.find((e) => e.field)!
    expect(screen.getByText(`${item.degree} v ${item.field}`)).toBeTruthy()
  })
})
