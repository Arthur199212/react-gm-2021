import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { deleteMovieFormReducer } from '@app/components/DeleteMovieForm/store'
import { movieFormReducer } from '@app/components/MovieForm/store'
import { movieReducer } from '@app/pages/Movie/store'
import { searchReducer } from '@app/pages/Search/store'

export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch

export type RootThunk = {
  dispatch: AppDispatch
  state: RootState
}

const rootReducer = combineReducers({
  deleteMovieForm: deleteMovieFormReducer,
  movie: movieReducer,
  movieForm: movieFormReducer,
  search: searchReducer
})

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
})
