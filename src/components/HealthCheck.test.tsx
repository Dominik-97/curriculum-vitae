import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, act } from '@testing-library/react'
import HealthCheck from './HealthCheck'

describe('<HealthCheck />', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('probes /health on mount and renders nothing', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      text: () => Promise.resolve('healthy'),
    })
    vi.stubGlobal('fetch', fetchMock)

    const { container } = render(<HealthCheck />)
    await act(async () => {}) // flush the resolved fetch promise + state update

    expect(fetchMock).toHaveBeenCalledWith('/health')
    expect(container.firstChild).toBeNull()
  })

  it('renders nothing and does not throw when the probe fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network down')))

    const { container } = render(<HealthCheck />)
    await act(async () => {})

    expect(container.firstChild).toBeNull()
  })
})
