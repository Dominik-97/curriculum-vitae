import { describe, it, expect } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import { renderWithLanguage } from '../test/utils'
import en from '../i18n/locales/en.json'
import Experience from './Experience'

const items = en.experience.items

describe('<Experience />', () => {
  it('renders a collapsible entry per job with descriptions hidden initially', () => {
    renderWithLanguage(<Experience />)
    expect(screen.getAllByRole('button')).toHaveLength(items.length)
    for (const job of items) {
      expect(screen.getByText(job.company)).toBeTruthy()
    }
    // Collapsed: the first job's first bullet is not in the DOM yet.
    expect(screen.queryByText(items[0].description[0])).toBeNull()
  })

  it('expands an entry on click and collapses it again', () => {
    renderWithLanguage(<Experience />)
    const firstToggle = screen.getAllByRole('button')[0]

    fireEvent.click(firstToggle)
    expect(screen.getByText(items[0].description[0])).toBeTruthy()
    expect(screen.getByText(items[0].remarks[0])).toBeTruthy()

    fireEvent.click(firstToggle)
    expect(screen.queryByText(items[0].description[0])).toBeNull()
  })

  it('renders every bullet when forceExpandAll is set (print mode)', () => {
    renderWithLanguage(<Experience forceExpandAll />)
    expect(screen.getByText(items[0].description[0])).toBeTruthy()
    expect(screen.getByText(items[items.length - 1].description[0])).toBeTruthy()
  })
})
