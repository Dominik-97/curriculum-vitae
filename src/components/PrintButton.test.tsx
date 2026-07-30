import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import PrintButton from './PrintButton'

describe('<PrintButton />', () => {
  beforeEach(() => {
    // jsdom's window.print is a no-op stub; replace it with a spy.
    window.print = vi.fn()
  })

  it('runs onBeforePrint then window.print when clicked', () => {
    const onBeforePrint = vi.fn()
    render(<PrintButton onBeforePrint={onBeforePrint} />)

    fireEvent.click(screen.getByRole('button', { name: 'Print CV' }))

    expect(onBeforePrint).toHaveBeenCalledTimes(1)
    expect(window.print).toHaveBeenCalledTimes(1)
  })

  it('prints on Ctrl/Cmd+P', () => {
    const onBeforePrint = vi.fn()
    render(<PrintButton onBeforePrint={onBeforePrint} />)

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'p', ctrlKey: true }))

    expect(onBeforePrint).toHaveBeenCalledTimes(1)
    expect(window.print).toHaveBeenCalledTimes(1)
  })

  it('calls onAfterPrint when the browser finishes printing', () => {
    const onAfterPrint = vi.fn()
    render(<PrintButton onAfterPrint={onAfterPrint} />)

    window.dispatchEvent(new Event('afterprint'))

    expect(onAfterPrint).toHaveBeenCalledTimes(1)
  })
})
