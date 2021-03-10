import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import {
  Button,
  CloseIcon,
  DualRingSpinner,
  FormField,
  GenreFormField,
  SmallModal,
  SuccessIcon,
  TextareaFormField
} from '@app/components'
import { useAppDispatch, useAppSelector, useClickOutside } from '@app/hooks'
import { capitalizeStr, sortGenresAlphabetically } from '@app/utils'
import { MovieFormContent, MovieFormTestIds, GENRES } from './MovieForm.constants'
import {
  addMovieThunk,
  MovieFormFields,
  reset,
  setFields,
  selectMovieFormFields,
  fetchMovieForFormThunk,
  editMovieThunk,
  MovieFormStatus,
  selectMovieFormStatus,
  setStatus
} from './store'
import './MovieForm.scss'

export type MovieFormProps = {
  content: MovieFormContent
  movieId?: string
  onClose: Function
  open: boolean
}

export const MovieForm = ({ content, movieId, onClose, open }: MovieFormProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const smallModalRef = useRef(null)

  const dispatch = useAppDispatch()
  const fields = useAppSelector(selectMovieFormFields)
  const status = useAppSelector(selectMovieFormStatus)

  useEffect(() => {
    if (content === MovieFormContent.EDIT && movieId && open) {
      dispatch(fetchMovieForFormThunk(movieId))
      return
    }

    if (content === MovieFormContent.CREATE && open) {
      dispatch(reset())
      dispatch(setStatus(MovieFormStatus.SUCCESS))
    }
  }, [content, dispatch, movieId, open])

  const handleSmallModalClose = () => setIsOpen(false)

  useClickOutside(smallModalRef, handleSmallModalClose, isOpen)

  const handleOnChange = (type: keyof MovieFormFields) => ({
    target: { value }
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(
      setFields({
        ...fields,
        [type]: value
      })
    )
  }

  const handleSelectGenre = (clickedGenre: string) => {
    const genreName = capitalizeStr(clickedGenre)

    if (fields.genres.includes(genreName)) {
      dispatch(
        setFields({
          ...fields,
          genres: fields.genres.filter(i => i !== genreName)
        })
      )
      return
    }

    dispatch(
      setFields({
        ...fields,
        genres: [...fields.genres, genreName]
      })
    )
  }

  const handleSubmit = () => {
    if (content === MovieFormContent.CREATE) {
      dispatch(addMovieThunk(fields))
    } else {
      dispatch(editMovieThunk())
    }
  }

  const handleClose = () => {
    onClose()
    dispatch(reset())
  }

  if (status === MovieFormStatus.LOADING) return <DualRingSpinner />

  if (status === MovieFormStatus.SUBMITTED) {
    setTimeout(() => handleClose(), 1000)
    return <SuccessIcon data-testid={MovieFormTestIds.SUCCESS_ICON} />
  }

  if (status === MovieFormStatus.ERROR) {
    return <h5 className='error-message'>Sorry, something went wrong.</h5>
  }

  return (
    <div className='form-container' data-testid={MovieFormTestIds.CONTAINER}>
      <h5 className='form-header'>
        {content === MovieFormContent.CREATE ? 'ADD MOVIE' : 'EDIT MOVIE'}
      </h5>
      <CloseIcon data-testid={MovieFormTestIds.CLOSE_ICON} onClick={handleClose} topRight />
      {content === MovieFormContent.EDIT && (
        <FormField
          aria-label='movie-id'
          label='MOVIE ID'
          onChange={handleOnChange('id')}
          placeholder='Movie ID'
          value={fields.id}
        />
      )}
      <FormField
        aria-label='title'
        label='TITLE'
        onChange={handleOnChange('title')}
        placeholder='Title'
        value={fields.title}
      />
      <FormField
        aria-label='release-date'
        label='RELEASE DATE'
        onChange={handleOnChange('release_date')}
        type='date'
        value={fields.release_date}
      />
      <FormField
        aria-label='movie-url'
        label='MOVIE URL'
        onChange={handleOnChange('poster_path')}
        placeholder='Movie Poster URL'
        type='url'
        value={fields.poster_path}
      />
      <FormField
        aria-label='genre'
        label='GENRE'
        onChange={event => {
          event.preventDefault()
        }}
        onClick={() => setIsOpen(true)}
        placeholder='Genge'
        value={sortGenresAlphabetically(fields.genres)}
      />
      <TextareaFormField
        aria-label='overview'
        label='OVERVIEW'
        noResize
        onChange={handleOnChange('overview')}
        placeholder='Overview'
        value={fields.overview}
      />
      <FormField
        aria-label='runtime'
        label='RUNTIME'
        onChange={handleOnChange('runtime')}
        placeholder='Runtime'
        value={fields.runtime}
      />
      <div className='form-actions-container'>
        <Button aria-label='reset' onClick={handleClose}>
          RESET
        </Button>
        <Button aria-label='submit' onClick={handleSubmit}>
          {content === MovieFormContent.CREATE ? 'SUBMIT' : 'SAVE'}
        </Button>
      </div>
      <SmallModal elRef={smallModalRef} open={isOpen} scrollable>
        <div className='genre-modal-title'>CHOOSE GENRES</div>
        <CloseIcon onClick={handleSmallModalClose} topRight />
        {GENRES.map(genre => (
          <GenreFormField
            key={`genre-${genre}`}
            defaultChecked={fields.genres.some(gnr => gnr.toLocaleLowerCase() === genre)}
            genre={genre}
            onClick={() => handleSelectGenre(genre)}
          />
        ))}
      </SmallModal>
    </div>
  )
}
