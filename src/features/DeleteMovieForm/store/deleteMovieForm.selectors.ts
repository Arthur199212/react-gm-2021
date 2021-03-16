import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@app/store'
import { DeleteMovieFormState } from './deleteMovieForm.slice'

export const selectMovieFormState = (state: RootState): DeleteMovieFormState =>
  state.deleteMovieForm

export const selectDeleteMovieFormStatus = createSelector(
  selectMovieFormState,
  state => state.status
)
