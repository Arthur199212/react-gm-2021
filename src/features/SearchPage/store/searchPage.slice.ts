import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Movie, MoviesSearchResponse } from '@app/services/movies'

export enum SearchStatus {
  ERROR = 'error',
  LOADING = 'loading',
  NO_RESULTS = 'noResults',
  SUCCESS = 'success'
}

export enum SearchFilter {
  ALL = 'all',
  COMEDY = 'comedy',
  CRIME = 'crime',
  DOCUMENTARY = 'documentary',
  HORROR = 'horror'
}

export enum SortBy {
  RATING = 'rating',
  RELEASE_DATE = 'release date'
}

export type SearchState = {
  filter: SearchFilter
  movies: Movie[]
  query: string
  searchQuery: string
  sortBy: SortBy
  status: SearchStatus
  totalAmount: number
}

export const initialState: SearchState = {
  filter: SearchFilter.ALL,
  movies: [],
  query: '',
  searchQuery: '',
  sortBy: SortBy.RELEASE_DATE,
  status: SearchStatus.NO_RESULTS,
  totalAmount: 0
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setFilter: (state, { payload }: PayloadAction<SearchFilter>) => {
      state.filter = payload
    },
    setMovies: (state, { payload }: PayloadAction<Movie[]>) => {
      state.movies = payload
    },
    setQuery: (state, { payload }: PayloadAction<string>) => {
      state.query = payload
    },
    setSearchQuery: (state, { payload }: PayloadAction<string>) => {
      state.searchQuery = payload
    },
    setSearchResult: (state, { payload }: PayloadAction<MoviesSearchResponse>) => {
      state.movies = payload.data
      state.status = payload.data.length ? SearchStatus.SUCCESS : SearchStatus.NO_RESULTS
      state.totalAmount = payload.totalAmount
    },
    setSearchStatus: (state, { payload }: PayloadAction<SearchStatus>) => {
      state.status = payload
    },
    setSortBy: (state, { payload }: PayloadAction<SortBy>) => {
      state.sortBy = payload
    }
  }
})

export const searchReducer = searchSlice.reducer

export const {
  setFilter,
  setMovies,
  setQuery,
  setSearchQuery,
  setSearchResult,
  setSearchStatus,
  setSortBy
} = searchSlice.actions
