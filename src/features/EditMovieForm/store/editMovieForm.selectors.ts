import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@app/store'
import { EditMovieFormState } from './editMovieForm.slice'

const selectEditMovieFormState = (state: RootState): EditMovieFormState => state.editMovieForm

export const selectMovieFormStatus = createSelector(selectEditMovieFormState, state => state.status)
