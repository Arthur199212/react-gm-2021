import { Formik, Form } from 'formik'
import React, { useEffect, useState } from 'react'
import {
  Button,
  CloseIcon,
  DualRingSpinner,
  FormField,
  MovieForm,
  GenresFormField,
  SuccessIcon,
  TextareaFormField
} from '@app/components'
import { useAppDispatch, useAppSelector, useTimeout } from '@app/hooks'
import { editMovieSchema } from '@app/validation'
import { initialValues as defaultValues, EditMovieFormTestIds } from './EditMovieForm.constants'
import {
  reset,
  fetchMovieForFormThunk,
  EditMovieFormStatus,
  selectMovieFormStatus,
  editMovieThunk
} from './store'

export type EditMovieFormProps = {
  movieId: string
  onClose: Function
  open: boolean
}

export const EditMovieForm = ({ movieId, onClose, open }: EditMovieFormProps) => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(selectMovieFormStatus)
  const [initialValues, setInitialValues] = useState(defaultValues)

  useEffect(() => {
    if (open) {
      dispatch(reset())
      dispatch(fetchMovieForFormThunk({ movieId, setInitialValues }))
    }
  }, [dispatch, movieId, open])

  useTimeout(onClose, 1000, status === EditMovieFormStatus.SUBMITTED)

  if (status === EditMovieFormStatus.LOADING) return <DualRingSpinner />

  if (status === EditMovieFormStatus.SUBMITTED) {
    return <SuccessIcon data-testid={EditMovieFormTestIds.SUCCESS_ICON} />
  }

  if (status === EditMovieFormStatus.ERROR) {
    return (
      <>
        <CloseIcon onClick={() => onClose()} topRight />
        <h5 className='error-message'>Sorry, something went wrong.</h5>
      </>
    )
  }

  return (
    <MovieForm data-testid={EditMovieFormTestIds.CONTAINER} title='EDIT MOVIE'>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          dispatch(editMovieThunk(values))
          resetForm()
        }}
        validationSchema={editMovieSchema}
      >
        {({ handleSubmit, resetForm }) => (
          <Form>
            <CloseIcon
              data-testid={EditMovieFormTestIds.CLOSE_ICON}
              onClick={() => {
                onClose()
                resetForm()
              }}
              topRight
            />
            <FormField aria-label='movie-id' label='Movie ID' name='id' placeholder='Movie ID' />
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
                SAVE
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </MovieForm>
  )
}
