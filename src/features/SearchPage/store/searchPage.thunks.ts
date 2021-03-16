import { createAsyncThunk } from '@reduxjs/toolkit'
import { moviesService } from '@app/services'
import { RootThunk } from '@app/store'
import { SearchStatus, setSearchResult, setSearchStatus } from './searchPage.slice'
import { SearchBy } from '@app/services/movies'

export const fetchMoviesThunk = createAsyncThunk<void, string, RootThunk>(
  'search/fetchMoviesThunk',
  async (query, { dispatch }) => {
    dispatch(setSearchStatus(SearchStatus.LOADING))

    try {
      const res = await moviesService.fetchMovies(query)

      dispatch(setSearchResult(res))
    } catch (err) {
      dispatch(setSearchStatus(SearchStatus.ERROR))
      console.error(err)
    }
  }
)

export const fetchMoviesDefaultThunk = createAsyncThunk<void, void, RootThunk>(
  'search/fetchMoviesDefaultThunk',
  async (payload, { dispatch }) => {
    dispatch(setSearchStatus(SearchStatus.LOADING))

    try {
      const res = await moviesService.fetchMoviesDefault()

      dispatch(setSearchResult(res))
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

      dispatch(setSearchResult(res))
    } catch (err) {
      dispatch(setSearchStatus(SearchStatus.ERROR))
      console.error(err)
    }
  }
)
