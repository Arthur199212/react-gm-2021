import { Formik, Form, Field } from 'formik'
import React, { useEffect } from 'react'
import {
  AddMovieFormTestIds,
  Button,
  CloseIcon,
  DualRingSpinner,
  FormField,
  GenresFormField,
  MovieForm,
  SuccessIcon,
  TextareaFormField
} from '@app/components'
import { useAppDispatch, useAppSelector, useTimeout } from '@app/hooks'
import { initialValues, validationSchema } from './AddMovieForm.constants'
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
        validationSchema={validationSchema}
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
                SUBMIT
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </MovieForm>
  )
}
