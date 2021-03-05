export const sortGenresAlphabetically = (genres: string[]) =>
  [...genres].sort((a, b) => a.localeCompare(b)).join(', ')
