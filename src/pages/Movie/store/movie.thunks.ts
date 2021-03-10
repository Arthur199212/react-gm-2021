import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchMoviesByGenreThunk } from '@app/pages/Search/store'
import { moviesService } from '@app/services'
import { RootThunk } from '@app/store'
import { MovieStatus, setMovie, setStatus } from './movie.slice'

export const fetchMovieThunk = createAsyncThunk<void, string, RootThunk>(
  'movie/fetchMovieThunk',
  async (movieId, { dispatch, getState }) => {
    const { movies } = getState().search
    dispatch(setStatus(MovieStatus.LOADING))

    try {
      const data = await moviesService.fetchMovie(movieId)

      // if no movies in store -> fetch movies with the same genre
      if (!movies.length) {
        dispatch(fetchMoviesByGenreThunk(data.genres[0]))
      }

      dispatch(setStatus(MovieStatus.SUCCESS))
      dispatch(setMovie(data))
    } catch (err) {
      dispatch(setStatus(MovieStatus.ERROR))
      console.error(err)
    }
  }
)
