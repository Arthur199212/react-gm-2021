import * as yup from 'yup'
import { EditMovieFormFields } from './store'

export enum EditMovieFormTestIds {
  CLOSE_ICON = 'edit-movie-form-close-icon',
  CONTAINER = 'edit-movie-form-container',
  SUCCESS_ICON = 'edit-movie-form-success-icon'
}

export const validationSchema = yup.object({
  id: yup.number().min(3).required(),
  genres: yup.array().of(yup.string()).min(1).required(),
  overview: yup.string().min(3).required(),
  poster_path: yup.string().url().required(),
  release_date: yup.string().required(),
  runtime: yup.number().min(1).required(),
  title: yup.string().min(3).required()
})

export const initialValues: EditMovieFormFields = {
  id: '',
  genres: [] as string[],
  overview: '',
  poster_path: '',
  release_date: '',
  runtime: '',
  title: ''
}
