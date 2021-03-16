import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@app/store'
import { AddMovieFormState } from './addMovieForm.slice'

const selectAddMovieFormState = (state: RootState): AddMovieFormState => state.addMovieForm

export const selectMovieFormStatus = createSelector(selectAddMovieFormState, state => state.status)
