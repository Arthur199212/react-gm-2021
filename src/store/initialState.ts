import { initialState as deleteMovieForm } from '@app/components/DeleteMovieForm/store'
import { initialState as movie } from '@app/pages/Movie/store'
import { initialState as addMovieForm } from '@app/components/AddMovieForm/store'
import { initialState as editMovieForm } from '@app/components/EditMovieForm/store'
import { initialState as search } from '@app/pages/Search/store'
import { RootState } from './store'

export const INITIAL_APP_STATE: RootState = {
  addMovieForm,
  deleteMovieForm,
  editMovieForm,
  movie,
  search
}
