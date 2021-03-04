import * as yup from 'yup'

export enum AddMovieFormTestIds {
  CLOSE_ICON = 'movie-form-close-icon',
  CONTAINER = 'movie-form-container',
  SUCCESS_ICON = 'movie-form-success-icon'
}

export const validationSchema = yup.object({
  genres: yup.array().of(yup.string()).min(1).required(),
  overview: yup.string().min(3).required(),
  poster_path: yup.string().url().required(),
  release_date: yup.string().required(),
  runtime: yup.number().min(1).required(),
  title: yup.string().min(3).required()
})

export const initialValues = {
  genres: [] as string[],
  overview: '',
  poster_path: '',
  release_date: '',
  runtime: '',
  title: ''
}
