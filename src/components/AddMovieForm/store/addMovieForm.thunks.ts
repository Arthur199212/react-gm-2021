import { createAsyncThunk } from '@reduxjs/toolkit'
import { moviesService } from '@app/services'
import { RootThunk } from '@app/store'
import { AddMovieFormFields, AddMovieFormStatus, setStatus } from './addMovieForm.slice'

export const addMovieThunk = createAsyncThunk<void, AddMovieFormFields, RootThunk>(
  'addMovieForm/addMovieThunk',
  async (movie, { dispatch }) => {
    dispatch(setStatus(AddMovieFormStatus.LOADING))

    try {
      await moviesService.addMovie(movie)

      dispatch(setStatus(AddMovieFormStatus.SUBMITTED))
    } catch (err) {
      dispatch(setStatus(AddMovieFormStatus.ERROR))
      console.error(err)
    }
  }
)
