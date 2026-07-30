import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import Analytics from './Analytics'

describe('<Analytics />', () => {
  it('injects no tracker script when env vars are not configured', () => {
    const before = document.querySelectorAll('script[data-website-id]').length
    const { container } = render(<Analytics />)

    // No env in the test run -> nothing rendered and no script appended.
    expect(container.firstChild).toBeNull()
    expect(document.querySelectorAll('script[data-website-id]').length).toBe(before)
  })
})
