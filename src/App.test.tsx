import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import App from './App'

describe('<App />', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('mounts the full CV tree (provider, health check and page)', async () => {
    // App mounts <HealthCheck /> which calls fetch('/health') on mount.
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, text: () => Promise.resolve('healthy') })
    )

    render(<App />)
    await act(async () => {})

    expect(screen.getByRole('heading', { level: 1 }).textContent).toContain('Dominik')
  })
})
