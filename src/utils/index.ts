export const capitalizeStr = (str: string) => str.replace(/^\w/, c => c.toUpperCase())

export const replaceFirstWord = (word: string, str?: string) => {
  if (!str) return str
  return str.replace(/[^\s]*/, word)
}

export const sortGenresAlphabetically = (genres: string[]) =>
  [...genres].sort((a, b) => a.localeCompare(b)).join(', ')

export const toKebabCase = (str: string) => str.replace(/\s+/g, '-').toLowerCase()
