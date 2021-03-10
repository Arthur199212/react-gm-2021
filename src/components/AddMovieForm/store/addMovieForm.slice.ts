import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export enum AddMovieFormStatus {
  ERROR = 'error',
  LOADING = 'loading',
  SUBMITTED = 'submitted',
  SUCCESS = 'success'
}

export type AddMovieFormFields = {
  genres: string[]
  overview: string
  poster_path: string
  release_date: string
  runtime: string
  title: string
}

export type AddMovieFormState = {
  status: AddMovieFormStatus
}

export const initialState: AddMovieFormState = {
  status: AddMovieFormStatus.SUCCESS
}

const addMovieFormSlice = createSlice({
  name: 'addMovieForm',
  initialState,
  reducers: {
    reset: () => initialState,
    setStatus: (state, { payload }: PayloadAction<AddMovieFormStatus>) => {
      state.status = payload
    }
  }
})

export const addMovieFormReducer = addMovieFormSlice.reducer

export const { reset, setStatus } = addMovieFormSlice.actions
