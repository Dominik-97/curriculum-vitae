import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ThemeToggle from './ThemeToggle'

const root = document.documentElement

describe('<ThemeToggle />', () => {
  it('defaults to light when nothing is saved and the system is not dark', () => {
    render(<ThemeToggle />)
    expect(root.classList.contains('dark')).toBe(false)
    expect(root.getAttribute('data-theme')).toBe('light')
    expect(localStorage.getItem('theme')).toBe('light')
  })

  it('toggles the theme and persists the choice', () => {
    render(<ThemeToggle />)
    const button = screen.getByRole('button', { name: 'Toggle theme' })

    fireEvent.click(button)
    expect(root.classList.contains('dark')).toBe(true)
    expect(root.getAttribute('data-theme')).toBe('dark')
    expect(localStorage.getItem('theme')).toBe('dark')

    fireEvent.click(button)
    expect(root.classList.contains('dark')).toBe(false)
    expect(localStorage.getItem('theme')).toBe('light')
  })

  it('respects a previously saved theme', () => {
    localStorage.setItem('theme', 'dark')
    render(<ThemeToggle />)
    expect(root.classList.contains('dark')).toBe(true)
    expect(root.getAttribute('data-theme')).toBe('dark')
  })
})
