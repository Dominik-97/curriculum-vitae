import { describe, it, expect } from 'vitest'
import { fireEvent, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { renderWithLanguage } from './test/utils'
import Header from './components/Header'
import Experience from './components/Experience'
import CVPage from './pages/CVPage'

type Results = Awaited<ReturnType<typeof axe>>

// Landmark/region rules are page-level and color-contrast needs real layout
// (unavailable in jsdom); everything else runs.
const axeOptions = {
  rules: {
    region: { enabled: false },
    'landmark-one-main': { enabled: false },
    'color-contrast': { enabled: false },
  },
}

const list = (results: Results) => results.violations.map((v) => `${v.id}: ${v.help}`)

describe('accessibility (axe)', () => {
  it('Header has no violations', async () => {
    const { container } = renderWithLanguage(<Header />)
    expect(list(await axe(container, axeOptions))).toEqual([])
  })

  it('Experience has no violations, collapsed or expanded', async () => {
    const { container } = renderWithLanguage(<Experience />)
    expect(list(await axe(container, axeOptions))).toEqual([])

    fireEvent.click(screen.getAllByRole('button')[0])
    expect(list(await axe(container, axeOptions))).toEqual([])
  })

  it('CVPage has no violations', async () => {
    const { container } = renderWithLanguage(<CVPage />)
    expect(list(await axe(container, axeOptions))).toEqual([])
  })
})
