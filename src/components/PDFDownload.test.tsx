import { describe, it, expect } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import { renderWithLanguage } from '../test/utils'
import en from '../i18n/locales/en.json'
import PDFDownload from './PDFDownload'

describe('<PDFDownload />', () => {
  it('links to the English and Czech release PDFs', () => {
    renderWithLanguage(<PDFDownload />)
    const enLink = screen.getByRole('link', { name: new RegExp(en.pdfDownload.english, 'i') })
    const czLink = screen.getByRole('link', { name: new RegExp(en.pdfDownload.czech, 'i') })
    expect(enLink.getAttribute('href')).toContain('cv_en.pdf')
    expect(czLink.getAttribute('href')).toContain('cv_cz.pdf')
  })

  it('reveals the info tooltip on hover and hides it on leave', () => {
    renderWithLanguage(<PDFDownload />)
    expect(screen.queryByText(en.pdfDownload.infoText)).toBeNull()

    const infoButton = screen.getByRole('button', { name: en.pdfDownload.infoText })
    fireEvent.mouseEnter(infoButton)
    expect(screen.getByText(en.pdfDownload.infoText)).toBeTruthy()

    fireEvent.mouseLeave(infoButton)
    expect(screen.queryByText(en.pdfDownload.infoText)).toBeNull()
  })
})
