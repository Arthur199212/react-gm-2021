import { createAsyncThunk } from '@reduxjs/toolkit'
import { moviesService } from '@app/services'
import { RootThunk } from '@app/store'
import { SearchStatus, setQuery, setSearchResult, setSearchStatus } from './searchPage.slice'
import { SearchBy } from '@app/services/movies'

export const fetchMoviesThunk = createAsyncThunk<void, string, RootThunk>(
  'search/fetchMoviesThunk',
  async (query, { dispatch }) => {
    dispatch(setQuery(''))
    dispatch(setSearchStatus(SearchStatus.LOADING))

    try {
      const res = await moviesService.fetchMovies(query)

      if (!res.data.length) {
        dispatch(setSearchStatus(SearchStatus.NO_RESULTS))
        return
      }

      dispatch(setSearchResult(res))
      dispatch(setSearchStatus(SearchStatus.SUCCESS))
    } catch (err) {
      dispatch(setSearchStatus(SearchStatus.ERROR))
      console.error(err)
    }
  }
)

export const fetchMoviesByGenreThunk = createAsyncThunk<void, string, RootThunk>(
  'search/fetchMoviesByGenreThunk',
  async (genre, { dispatch }) => {
    dispatch(setSearchStatus(SearchStatus.LOADING))

    try {
      const res = await moviesService.fetchMovies(genre, SearchBy.GENRES)

      if (!res.data.length) {
        dispatch(setSearchStatus(SearchStatus.NO_RESULTS))
        return
      }

      dispatch(setSearchResult(res))
      dispatch(setSearchStatus(SearchStatus.SUCCESS))
    } catch (err) {
      dispatch(setSearchStatus(SearchStatus.ERROR))
      console.error(err)
    }
  }
)
