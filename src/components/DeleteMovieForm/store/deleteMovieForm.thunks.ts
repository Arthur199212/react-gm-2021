import { createAsyncThunk } from '@reduxjs/toolkit'
import { moviesService } from '@app/services'
import { RootThunk } from '@app/store'
import { setMovies } from '@app/pages/Search/store'
import { DeleteMovieFormStatus, setStatus } from './deleteMovieForm.slice'

export const deleteMovieThunk = createAsyncThunk<void, string, RootThunk>(
  'deleteMovieForm/deleteMovieThunk',
  async (movieId, { dispatch, getState }) => {
    const { movies } = getState().search
    dispatch(setStatus(DeleteMovieFormStatus.LOADING))

    try {
      await moviesService.deleteMovie(movieId)

      const updatedMovies = movies.filter(({ id }) => String(id) !== movieId)

      dispatch(setMovies(updatedMovies))
      dispatch(setStatus(DeleteMovieFormStatus.SUCCESS))
    } catch (err) {
      dispatch(setStatus(DeleteMovieFormStatus.ERROR))
      console.error(err)
    }
  }
)
