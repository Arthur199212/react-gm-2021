import { Formik, Form, Field } from 'formik'
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
import {
  initialValues as defaultValues,
  EditMovieFormTestIds,
  validationSchema
} from './EditMovieForm.constants'
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
        validationSchema={validationSchema}
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
            <Field
              aria-label='movie-id'
              component={FormField}
              label='Movie ID'
              name='id'
              placeholder='Movie ID'
            />
            <Field
              aria-label='title'
              component={FormField}
              label='Title'
              name='title'
              placeholder='Title'
            />
            <Field
              aria-label='release-date'
              component={FormField}
              label='Release date'
              name='release_date'
              type='date'
            />
            <Field
              aria-label='movie-url'
              component={FormField}
              label='Movie URL'
              name='poster_path'
              placeholder='Movie Poster URL'
              type='url'
            />
            <Field
              aria-label='genre'
              component={GenresFormField}
              label='Genre'
              name='genres'
              placeholder='Genge'
            />
            <Field
              aria-label='overview'
              component={TextareaFormField}
              label='Overview'
              name='overview'
              noResize
              placeholder='Overview'
            />
            <Field
              aria-label='runtime'
              component={FormField}
              label='Runtime'
              name='runtime'
              placeholder='Runtime'
            />
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
              <Button aria-label='submit' onClick={handleSubmit as any}>
                SAVE
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </MovieForm>
  )
}
