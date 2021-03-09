import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { deleteMovieFormReducer } from '@app/features/DeleteMovieForm/store'
import { addMovieFormReducer } from '@app/features/AddMovieForm/store'
import { editMovieFormReducer } from '@app/features/EditMovieForm/store'
import { movieReducer } from '@app/features/MoviePage/store'
import { searchReducer } from '@app/features/SearchPage/store'

export type RootState = ReturnType<typeof rootReducer>

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

export const createStore = (preloadedState?: RootState) =>
  configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState
  })

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
})

export type AppDispatch = ReturnType<typeof createStore>['dispatch']
