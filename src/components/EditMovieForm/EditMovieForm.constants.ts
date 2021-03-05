import { EditMovieFormFields } from './store'

export enum EditMovieFormTestIds {
  CLOSE_ICON = 'edit-movie-form-close-icon',
  CONTAINER = 'edit-movie-form-container',
  SUCCESS_ICON = 'edit-movie-form-success-icon'
}

export const initialValues: EditMovieFormFields = {
  id: '',
  genres: [] as string[],
  overview: '',
  poster_path: '',
  release_date: '',
  runtime: '',
  title: ''
}
