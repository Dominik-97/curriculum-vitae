import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

// jsdom doesn't implement matchMedia; ThemeToggle reads it during init.
if (!window.matchMedia) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })) as unknown as typeof window.matchMedia
}

// jsdom doesn't implement IntersectionObserver; SectionNav uses it for scroll-spy.
const globalWithIO = window as unknown as {
  IntersectionObserver?: typeof IntersectionObserver
}
if (!globalWithIO.IntersectionObserver) {
  class MockIntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return []
    }
  }
  globalWithIO.IntersectionObserver =
    MockIntersectionObserver as unknown as typeof IntersectionObserver
}

// Unmount React trees and reset shared global state between tests so they don't leak.
afterEach(() => {
  cleanup()
  localStorage.clear()
  document.documentElement.classList.remove('dark')
  document.documentElement.removeAttribute('data-theme')
})
