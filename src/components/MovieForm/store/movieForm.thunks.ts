import { createAsyncThunk } from '@reduxjs/toolkit'
import { moviesService } from '@app/services'
import { RootThunk } from '@app/store'
import {
  initialState,
  MovieFormFields,
  MovieFormStatus,
  setFields,
  setStatus
} from './movieForm.slice'
import { setMovie } from '@app/pages/Movie/store'
import { setMovies } from '@app/pages/Search/store'
import { Movie } from '@app/services/movies'

export const addMovieThunk = createAsyncThunk<void, MovieFormFields, RootThunk>(
  'movieForm/addMovieThunk',
  async (movie, { dispatch }) => {
    dispatch(setStatus(MovieFormStatus.LOADING))

    try {
      await moviesService.addMovie(movie)

      dispatch(setStatus(MovieFormStatus.SUBMITTED))
      dispatch(setFields(initialState.fields))
    } catch (err) {
      dispatch(setStatus(MovieFormStatus.ERROR))
      console.error(err)
    }
  }
)

export const fetchMovieForFormThunk = createAsyncThunk<void, string, RootThunk>(
  'movieForm/fetchMovieForFormThunk',
  async (movieId, { dispatch }) => {
    dispatch(setStatus(MovieFormStatus.LOADING))

    try {
      const res = await moviesService.fetchMovie(movieId)

      dispatch(
        setFields({
          genres: res.genres,
          id: res.id,
          overview: res.overview,
          poster_path: res.poster_path,
          release_date: res.release_date,
          runtime: String(res.runtime),
          title: res.title
        })
      )

      dispatch(setStatus(MovieFormStatus.SUCCESS))
    } catch (err) {
      dispatch(setStatus(MovieFormStatus.ERROR))
      console.error(err)
    }
  }
)

export const editMovieThunk = createAsyncThunk<void, void, RootThunk>(
  'movieForm/editMovieThunk',
  async (payload, { dispatch, getState }) => {
    dispatch(setStatus(MovieFormStatus.LOADING))
    const { fields } = getState().movieForm
    const { movie } = getState().movie
    const { movies } = getState().search

    try {
      await moviesService.editMovie(fields)

      // update movie data if it's selected
      if (movie?.id === fields.id) {
        dispatch(setMovie({ ...movie, ...fields, runtime: Number(fields.runtime) }))
      }

      // update movie data if it's in search results
      if (movies.some(({ id }) => fields.id === id)) {
        const movie = movies.find(({ id }) => id === fields.id)
        const updatedMovie = { ...movie, ...fields, runtime: Number(fields.runtime) } as Movie
        const restOfMovies = movies.filter(({ id }) => id !== fields.id)
        dispatch(setMovies([...restOfMovies, updatedMovie]))
      }

      dispatch(setStatus(MovieFormStatus.SUBMITTED))
    } catch (err) {
      dispatch(setStatus(MovieFormStatus.ERROR))
      console.error(err)
    }
  }
)
