import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Movie } from '@app/services/movies'

export enum MovieStatus {
  ERROR = 'error',
  LOADING = 'loading',
  SUCCESS = 'success'
}

export type MovieState = {
  isSsrData?: boolean
  movie?: Movie
  status: MovieStatus
}

export const initialState: MovieState = {
  status: MovieStatus.LOADING
}

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setMovie: (state, { payload }: PayloadAction<Movie>) => {
      state.movie = payload
    },
    setSearchResult: (state, { payload }: PayloadAction<Movie>) => {
      state.movie = payload
      state.status = MovieStatus.SUCCESS
    },
    setStatus: (state, { payload }: PayloadAction<MovieStatus>) => {
      state.status = payload
    }
  }
})

export const movieReducer = movieSlice.reducer

export const { setMovie, setSearchResult, setStatus } = movieSlice.actions
