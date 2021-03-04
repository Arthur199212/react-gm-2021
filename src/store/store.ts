import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { deleteMovieFormReducer } from '@app/components/DeleteMovieForm/store'
import { addMovieFormReducer } from '@app/components/AddMovieForm/store'
import { editMovieFormReducer } from '@app/components/EditMovieForm/store'
import { movieReducer } from '@app/pages/Movie/store'
import { searchReducer } from '@app/pages/Search/store'

export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch

export type RootThunk = {
  dispatch: AppDispatch
  state: RootState
}

export const rootReducer = combineReducers({
  addMovieForm: addMovieFormReducer,
  deleteMovieForm: deleteMovieFormReducer,
  editMovieForm: editMovieFormReducer,
  movie: movieReducer,
  search: searchReducer
})

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
})
