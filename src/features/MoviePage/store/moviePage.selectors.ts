import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@app/store'
import { MovieState } from './moviePage.slice'

const selectMovieState = (state: RootState): MovieState => state.movie

export const selectMovie = createSelector(selectMovieState, state => state.movie)

export const selectMovieStatus = createSelector(selectMovieState, state => state.status)
