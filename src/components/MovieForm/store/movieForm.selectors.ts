import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@app/store'
import { MovieFormState } from './movieForm.slice'

export const selectMovieFormState = (state: RootState): MovieFormState => state.movieForm

export const selectMovieFormFields = createSelector(selectMovieFormState, state => state.fields)

export const selectMovieFormStatus = createSelector(selectMovieFormState, state => state.status)
