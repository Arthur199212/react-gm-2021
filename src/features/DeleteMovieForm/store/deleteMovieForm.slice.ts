import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export enum DeleteMovieFormStatus {
  ERROR = 'error',
  LOADING = 'loading',
  SUCCESS = 'success'
}

export type DeleteMovieFormState = {
  status?: DeleteMovieFormStatus
}

export const initialState: DeleteMovieFormState = {}

const deleteMovieFormSlice = createSlice({
  name: 'deleteMovieForm',
  initialState,
  reducers: {
    reset: () => initialState,
    setStatus: (state, { payload }: PayloadAction<DeleteMovieFormStatus>) => {
      state.status = payload
    }
  }
})

export const deleteMovieFormReducer = deleteMovieFormSlice.reducer

export const { reset, setStatus } = deleteMovieFormSlice.actions
