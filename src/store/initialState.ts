import { initialState as deleteMovieForm } from '@app/components/DeleteMovieForm/store'
import { initialState as movie } from '@app/pages/Movie/store'
import { initialState as movieForm } from '@app/components/MovieForm/store'
import { initialState as search } from '@app/pages/Search/store'
import { RootState } from './store'

export const INITIAL_APP_STATE: RootState = {
  deleteMovieForm,
  movie,
  movieForm,
  search
}
