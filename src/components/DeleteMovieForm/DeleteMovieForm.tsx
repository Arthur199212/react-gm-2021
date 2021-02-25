import React from 'react'
import { Button } from '@app/components'
import { useAppDispatch, useAppSelector } from '@app/hooks'
import {
  deleteMovieThunk,
  DeleteMovieFormStatus,
  reset,
  selectDeleteMovieFormStatus
} from './store'
import './DeleteMovieForm.scss'
import { DualRingSpinner } from '../DualRingSpinner'
import { SuccessIcon } from '../SuccessIcon'
import { CloseIcon } from '../CloseIcon/CloseIcon'

type DeleteMovieFormProps = {
  movieId: string
  onClose: () => void
}

export const DeleteMovieForm = ({ movieId, onClose }: DeleteMovieFormProps) => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(selectDeleteMovieFormStatus)

  if (status === DeleteMovieFormStatus.LOADING) {
    return (
      <div className='delete-movie-form-container centered'>
        <DualRingSpinner />
      </div>
    )
  }

  if (status === DeleteMovieFormStatus.SUCCESS) {
    setTimeout(() => {
      onClose()
      dispatch(reset())
    }, 1000)
    return (
      <div className='delete-movie-form-container centered'>
        <SuccessIcon />
      </div>
    )
  }

  if (status === DeleteMovieFormStatus.ERROR) {
    return (
      <div className='delete-movie-form-container centered'>
        <h5 className='error-message'>Sorry, something went wrong.</h5>
      </div>
    )
  }

  return (
    <>
      <div className='delete-movie-form-container'>
        <h5 className='delete-movie-form-header'>DELETE MOVIE</h5>
        <CloseIcon onClick={onClose} topRight />
        <div className='delete-movie-form-text'>Are you sure you want to delete this movie?</div>
      </div>
      <div className='delete-movie-form-actions-container'>
        <Button onClick={() => dispatch(deleteMovieThunk(movieId))}>CONFIRM</Button>
      </div>
    </>
  )
}
