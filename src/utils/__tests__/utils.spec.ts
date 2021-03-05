import { sortGenresAlphabetically } from '@app/utils'

describe('sortGenresAlphabetically util', () => {
  it('should work properly', () => {
    expect(sortGenresAlphabetically(['Cccc', 'Bbbb', 'Aaaa'])).toBe('Aaaa, Bbbb, Cccc')
    expect(sortGenresAlphabetically(['cC', 'C', 'c'])).toBe('c, C, cC')
    expect(sortGenresAlphabetically(['Family', 'Action', 'Comedy'])).toBe('Action, Comedy, Family')
  })
})
