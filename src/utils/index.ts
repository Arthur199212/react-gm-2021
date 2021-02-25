export const capitalizeStr = (str: string) => str.replace(/^\w/, c => c.toUpperCase())

export const toKebabCase = (str: string) => str.replace(/\s+/g, '-').toLowerCase()

export const sortGenresAlphabetically = (genres: string[]) =>
  [...genres].sort((a, b) => a.localeCompare(b)).join(', ')
