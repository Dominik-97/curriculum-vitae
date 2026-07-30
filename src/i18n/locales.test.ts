import { describe, it, expect } from 'vitest'
import en from './locales/en.json'
import cs from './locales/cs.json'

/**
 * Collects the full set of structural paths of a JSON value: object keys are
 * descended by name, arrays by index. Two locales that share the same content
 * shape (same sections, same number of experience/education entries, same
 * fields per entry) produce identical path sets — so a drift between en and cs
 * (e.g. a job added to one language but not the other) fails this test.
 */
function shape(value: unknown, prefix = ''): string[] {
  if (Array.isArray(value)) {
    return value.flatMap((item, i) => shape(item, `${prefix}[${i}]`))
  }
  if (value !== null && typeof value === 'object') {
    return Object.keys(value as Record<string, unknown>)
      .sort()
      .flatMap((key) =>
        shape((value as Record<string, unknown>)[key], prefix ? `${prefix}.${key}` : key)
      )
  }
  return [prefix]
}

describe('i18n locale parity', () => {
  it('exposes the same top-level sections in en and cs', () => {
    expect(Object.keys(cs).sort()).toEqual(Object.keys(en).sort())
  })

  it('has an identical content structure across en and cs', () => {
    expect(shape(cs)).toEqual(shape(en))
  })
})
