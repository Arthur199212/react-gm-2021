import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export enum MovieFormStatus {
  ERROR = 'error',
  LOADING = 'loading',
  SUBMITTED = 'submitted',
  SUCCESS = 'success'
}

export type MovieFormFields = {
  genres: string[]
  id: number
  overview: string
  poster_path: string
  release_date: string
  runtime: string
  title: string
}

export type MovieFormState = {
  fields: MovieFormFields
  status: MovieFormStatus
}

export const initialState: MovieFormState = {
  fields: {
    genres: [],
    id: 0,
    overview: '',
    poster_path: '',
    release_date: '',
    runtime: '',
    title: ''
  },
  status: MovieFormStatus.LOADING
}

const movieFormSlice = createSlice({
  name: 'movieForm',
  initialState,
  reducers: {
    reset: () => initialState,
    setFields: (state, { payload }: PayloadAction<MovieFormFields>) => {
      state.fields = payload
    },
    setStatus: (state, { payload }: PayloadAction<MovieFormStatus>) => {
      state.status = payload
    }
  }
})

export const movieFormReducer = movieFormSlice.reducer

export const { reset, setFields, setStatus } = movieFormSlice.actions
