import { describe, it, expect, vi } from 'vitest'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import { renderWithLanguage } from '../test/utils'
import en from '../i18n/locales/en.json'
import Header from './Header'

function renderHeader() {
  return renderWithLanguage(<Header />)
}

describe('<Header />', () => {
  it('renders the name and English content by default', () => {
    renderHeader()
    expect(screen.getByRole('heading', { level: 1 }).textContent).toContain('Dominik')
    expect(screen.getByText('Helping Businesses Succeed')).toBeTruthy()
  })

  it('switches to Czech when the CS toggle is clicked', () => {
    renderHeader()
    fireEvent.click(screen.getByRole('button', { name: 'Switch to Czech' }))
    expect(screen.getByText('Pomáhám firmám uspět')).toBeTruthy()
  })

  it('exposes accessible email and GitHub links even when labels are icon-only', () => {
    renderHeader()
    expect(screen.getByRole('link', { name: /email/i })).toBeTruthy()
    expect(screen.getByRole('link', { name: /github/i })).toBeTruthy()
  })

  it('copies the email address and shows a confirmation', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    })

    renderHeader()
    fireEvent.click(screen.getByRole('button', { name: en.header.copyEmail }))

    await waitFor(() => expect(writeText).toHaveBeenCalledWith('dominikbalint@email.cz'))
    expect(await screen.findByText(en.header.emailCopied)).toBeTruthy()
  })
})
