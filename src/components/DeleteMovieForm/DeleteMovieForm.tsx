import React, { useEffect } from 'react'
import { Button, CloseIcon, DualRingSpinner, SuccessIcon } from '@app/components'
import { useAppDispatch, useAppSelector, useTimeout } from '@app/hooks'
import { DeleteMovieFormTestIds } from './DeleteMovieForm.constants'
import {
  deleteMovieThunk,
  DeleteMovieFormStatus,
  reset,
  selectDeleteMovieFormStatus
} from './store'
import './DeleteMovieForm.scss'

type DeleteMovieFormProps = {
  movieId: string
  onClose: Function
  open: boolean
}

export const DeleteMovieForm = ({ movieId, onClose, open }: DeleteMovieFormProps) => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(selectDeleteMovieFormStatus)

  useEffect(() => {
    open && dispatch(reset())
  }, [dispatch, movieId, open])

  useTimeout(onClose, 1000, status === DeleteMovieFormStatus.SUCCESS)

  if (status === DeleteMovieFormStatus.LOADING) {
    return (
      <div className='delete-movie-form-container centered'>
        <DualRingSpinner />
      </div>
    )
  }

  if (status === DeleteMovieFormStatus.SUCCESS) {
    return (
      <div className='delete-movie-form-container centered'>
        <SuccessIcon data-testid={DeleteMovieFormTestIds.SUCCESS_ICON} />
      </div>
    )
  }

  if (status === DeleteMovieFormStatus.ERROR) {
    return (
      <div className='delete-movie-form-container centered'>
        <CloseIcon onClick={() => onClose()} topRight />
        <h5 className='error-message'>Sorry, something went wrong.</h5>
      </div>
    )
  }

  return (
    <>
      <div className='delete-movie-form-container'>
        <h5 className='delete-movie-form-header'>DELETE MOVIE</h5>
        <CloseIcon
          data-testid={DeleteMovieFormTestIds.CLOSE_ICON}
          onClick={() => onClose()}
          topRight
        />
        <div className='delete-movie-form-text'>Are you sure you want to delete this movie?</div>
      </div>
      <div className='delete-movie-form-actions-container'>
        <Button
          data-testid={DeleteMovieFormTestIds.CONFIRM_BUTTON}
          onClick={() => dispatch(deleteMovieThunk(movieId))}
        >
          CONFIRM
        </Button>
      </div>
    </>
  )
}
