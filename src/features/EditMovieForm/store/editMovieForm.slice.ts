import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export enum EditMovieFormStatus {
  ERROR = 'error',
  LOADING = 'loading',
  SUBMITTED = 'submitted',
  SUCCESS = 'success'
}

export type EditMovieFormFields = {
  genres: string[]
  id: string
  overview: string
  poster_path: string
  release_date: string
  runtime: string
  title: string
}

export type EditMovieFormState = {
  status: EditMovieFormStatus
}

export const initialState: EditMovieFormState = {
  status: EditMovieFormStatus.LOADING
}

const editMovieFormSlice = createSlice({
  name: 'editMovieForm',
  initialState,
  reducers: {
    reset: () => initialState,
    setStatus: (state, { payload }: PayloadAction<EditMovieFormStatus>) => {
      state.status = payload
    }
  }
})

export const editMovieFormReducer = editMovieFormSlice.reducer

export const { reset, setStatus } = editMovieFormSlice.actions
