import { initialState as deleteMovieForm } from '@app/features/DeleteMovieForm/store'
import { initialState as movie } from '@app/features/MoviePage/store'
import { initialState as addMovieForm } from '@app/features/AddMovieForm/store'
import { initialState as editMovieForm } from '@app/features/EditMovieForm/store'
import { initialState as search } from '@app/features/SearchPage/store'
import { RootState } from './store'

export const INITIAL_APP_STATE: RootState = {
  addMovieForm,
  deleteMovieForm,
  editMovieForm,
  movie,
  search
}
