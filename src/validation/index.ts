import * as yup from 'yup'

const id = yup.number().typeError('Movie ID must be a number').required('Movie ID is required')
const genres = yup
  .array()
  .of(yup.string())
  .min(1, 'Movie should have at least one genre')
  .required('Movie genres should be provided')
const overview = yup
  .string()
  .typeError('Overview should be a string')
  .min(3, 'Overview should be at least 3 characters long')
  .required('Overview is required')
const poster_path = yup
  .string()
  .typeError('Movie URL should be a valid URL path')
  .url('Movie URL should be a valid URL path')
  .required('Movie URL is required')
const release_date = yup
  .date()
  .typeError('Release date should be valid date')
  .required('Release date is required')
const runtime = yup
  .number()
  .typeError('Runtime should be a number')
  .min(1, 'Runtime should contain at least one digit')
  .required('Runtime is required')
const title = yup
  .string()
  .typeError('Title should be a string')
  .min(3, 'Title should be at least 3 characters long')
  .required('Title is required')

export const addMovieSchema = yup.object({
  genres,
  overview,
  poster_path,
  release_date,
  runtime,
  title
})

export const editMovieSchema = yup.object({
  id,
  genres,
  overview,
  poster_path,
  release_date,
  runtime,
  title
})
