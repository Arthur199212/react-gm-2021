export const LIMIT = 8

export enum SearchBy {
  GENRES = 'genres',
  TITLE = 'title'
}

export type Movie = {
  budget: number
  genres: string[]
  id: number
  overview: string
  poster_path: string
  release_date: string
  revenue: number
  runtime: number
  tagline: string
  title: string
  vote_average: number
  vote_count: number
}

export type MoviesSearchResponse = {
  data: Movie[]
  limit: number
  offset: number
  totalAmount: number
}
