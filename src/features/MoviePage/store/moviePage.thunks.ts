import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchMoviesByGenreThunk } from '@app/features/SearchPage/store'
import { moviesService } from '@app/services'
import { RootThunk } from '@app/store'
import { MovieStatus, setSearchResult, setStatus } from './moviePage.slice'

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

      dispatch(setSearchResult(data))
    } catch (err) {
      dispatch(setStatus(MovieStatus.ERROR))
      console.error(err)
    }
  }
)
