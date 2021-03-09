import { Formik, Form } from 'formik'
import React, { useEffect } from 'react'
import {
  Button,
  CloseIcon,
  DualRingSpinner,
  FormField,
  GenresFormField,
  MovieForm,
  SuccessIcon,
  TextareaFormField
} from '@app/components'
import { AddMovieFormTestIds } from '@app/features'
import { useAppDispatch, useAppSelector, useTimeout } from '@app/hooks'
import { addMovieSchema } from '@app/validation'
import { initialValues } from './AddMovieForm.constants'
import { reset, AddMovieFormStatus, selectMovieFormStatus, addMovieThunk } from './store'

export type AddMovieFormProps = {
  onClose: Function
  open: boolean
}

export const AddMovieForm = ({ onClose, open }: AddMovieFormProps) => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(selectMovieFormStatus)

  useEffect(() => {
    open && dispatch(reset())
  }, [dispatch, open])

  useTimeout(onClose, 1000, status === AddMovieFormStatus.SUBMITTED)

  if (status === AddMovieFormStatus.LOADING) return <DualRingSpinner />

  if (status === AddMovieFormStatus.SUBMITTED) {
    return <SuccessIcon data-testid={AddMovieFormTestIds.SUCCESS_ICON} />
  }

  if (status === AddMovieFormStatus.ERROR) {
    return (
      <>
        <CloseIcon onClick={() => onClose()} topRight />
        <h5 className='error-message'>Sorry, something went wrong.</h5>
      </>
    )
  }

  return (
    <MovieForm data-testid={AddMovieFormTestIds.CONTAINER} title='ADD MOVIE'>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          dispatch(addMovieThunk(values))
          resetForm()
        }}
        validationSchema={addMovieSchema}
      >
        {({ handleSubmit, resetForm }) => (
          <Form>
            <CloseIcon
              data-testid={AddMovieFormTestIds.CLOSE_ICON}
              onClick={() => {
                onClose()
                resetForm()
              }}
              topRight
            />
            <FormField aria-label='title' label='Title' name='title' placeholder='Title' />
            <FormField
              aria-label='release-date'
              label='Release date'
              name='release_date'
              type='date'
            />
            <FormField
              aria-label='movie-url'
              label='Movie URL'
              name='poster_path'
              placeholder='Movie Poster URL'
              type='url'
            />
            <GenresFormField aria-label='genre' label='Genre' name='genres' placeholder='Genge' />
            <TextareaFormField
              aria-label='overview'
              label='Overview'
              name='overview'
              noResize
              placeholder='Overview'
            />
            <FormField aria-label='runtime' label='Runtime' name='runtime' placeholder='Runtime' />
            <div className='form-actions-container'>
              <Button
                aria-label='reset'
                onClick={() => {
                  onClose()
                  resetForm()
                }}
              >
                RESET
              </Button>
              <Button aria-label='submit' onClick={() => handleSubmit()}>
                SUBMIT
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </MovieForm>
  )
}
