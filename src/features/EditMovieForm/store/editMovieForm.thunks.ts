import { Dispatch, SetStateAction } from 'react'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { setMovie } from '@app/features/MoviePage/store'
import { setMovies } from '@app/features/SearchPage/store'
import { Movie, moviesService } from '@app/services'
import { RootThunk } from '@app/store'
import { EditMovieFormFields, EditMovieFormStatus, setStatus } from './editMovieForm.slice'

const getUpdatedMovie = (fields: EditMovieFormFields, movie?: Movie) => {
  if (!movie) return null

  return {
    ...movie,
    ...fields,
    runtime: Number(fields.runtime),
    id: Number(fields.id)
  } as Movie
}

export const fetchMovieForFormThunk = createAsyncThunk<
  void,
  { movieId: string; setInitialValues: Dispatch<SetStateAction<EditMovieFormFields>> },
  RootThunk
>('editMovieForm/fetchMovieForFormThunk', async ({ movieId, setInitialValues }, { dispatch }) => {
  dispatch(setStatus(EditMovieFormStatus.LOADING))

  try {
    const res = await moviesService.fetchMovie(movieId)

    // set init values for formik
    setInitialValues({
      genres: res.genres,
      id: String(res.id),
      overview: res.overview,
      poster_path: res.poster_path,
      release_date: res.release_date,
      runtime: String(res.runtime),
      title: res.title
    })

    dispatch(setStatus(EditMovieFormStatus.SUCCESS))
  } catch (err) {
    dispatch(setStatus(EditMovieFormStatus.ERROR))
    console.error(err)
  }
})

export const editMovieThunk = createAsyncThunk<void, EditMovieFormFields, RootThunk>(
  'editMovieForm/editMovieThunk',
  async (fields, { dispatch, getState }) => {
    dispatch(setStatus(EditMovieFormStatus.LOADING))
    const { movie } = getState().movie
    const { movies } = getState().search

    try {
      await moviesService.editMovie(fields)

      // update movie data if it's selected
      if (String(movie?.id) === fields.id) {
        dispatch(
          setMovie({
            ...movie,
            ...fields,
            runtime: Number(fields.runtime),
            id: Number(fields.id)
          } as Movie)
        )
      }

      // update movie data if it's in search results
      if (movies.some(({ id }) => fields.id === String(id))) {
        const movie = movies.find(({ id }) => fields.id === String(id))
        const updatedMovie = getUpdatedMovie(fields, movie)
        const restOfMovies = movies.filter(({ id }) => fields.id !== String(id))
        const newMovies = [...restOfMovies, updatedMovie].filter(Boolean) as Movie[]
        dispatch(setMovies(newMovies))
      }

      dispatch(setStatus(EditMovieFormStatus.SUBMITTED))
    } catch (err) {
      dispatch(setStatus(EditMovieFormStatus.ERROR))
      console.error(err)
    }
  }
)
