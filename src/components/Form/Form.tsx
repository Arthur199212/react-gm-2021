import React, { ChangeEvent, useCallback, useRef, useState } from 'react'
import {
  Button,
  FormField,
  SmallModal,
  MultipleSelectionFormField,
  TextareaFormField
} from '@app/components'
import { useClickOutside } from '@app/hooks'
import { capitalizeStr } from '@app/utils'
import { FormContent, FormTestIds, GENRES, INITIAL_STATE } from './Form.constants'
import './Form.scss'

export type FormState = {
  genre: string[]
  overview: string
  movieId: string
  releaseDate: string
  runtime?: number
  title: string
  url: string
}

type FormProps = {
  content: FormContent
  onClose: Function
}

export const Form = ({ content, onClose }: FormProps) => {
  const [form, setForm] = useState<FormState>(INITIAL_STATE)
  const [isOpen, setIsOpen] = useState(false)
  const modalRef = useRef(null)

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = useCallback(() => setIsOpen(false), [])

  useClickOutside(modalRef, handleClose, isOpen)

  const handleOnChange = (type: keyof FormState) => ({
    target: { value }
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [type]: value
    })
  }

  const handleSelectGenre = (clickedGenre: string) => {
    const genreName = capitalizeStr(clickedGenre)

    if (form.genre.includes(genreName)) {
      setForm({
        ...form,
        genre: form.genre.filter(i => i !== genreName)
      })
      return
    }

    setForm({
      ...form,
      genre: [...form.genre, genreName]
    })
  }

  return (
    <div className='form-container'>
      <h5 className='form-header'>{content === FormContent.CREATE ? 'ADD MOVIE' : 'EDIT MOVIE'}</h5>
      <i
        className='fas fa-times close-icon'
        onClick={() => onClose()}
        data-testid={FormTestIds.CLOSE_ICON}
      ></i>
      {content === FormContent.EDIT && (
        <FormField
          aria-label='movie-id'
          label='MOVIE ID'
          onChange={handleOnChange('movieId')}
          placeholder='Movie ID'
          value={form.movieId}
        />
      )}
      <FormField
        aria-label='title'
        label='TITLE'
        onChange={handleOnChange('title')}
        placeholder='Title'
        value={form.title}
      />
      <FormField
        aria-label='release-date'
        label='RELEASE DATE'
        onChange={handleOnChange('releaseDate')}
        type='date'
        value={form.releaseDate}
      />
      <FormField
        aria-label='movie-url'
        label='MOVIE URL'
        onChange={handleOnChange('url')}
        placeholder='Movie Poster URL'
        type='url'
        value={form.url}
      />
      <MultipleSelectionFormField
        aria-label='genre'
        label='GENRE'
        onChange={event => {
          event.preventDefault()
        }}
        onOpen={handleOpen}
        placeholder='Genge'
        value={form.genre.sort((a, b) => a.localeCompare(b)).join(', ')}
      >
        <SmallModal elRef={modalRef} open={isOpen} scrollable>
          <div className='genre-modal-title'>CHOOSE GENRES</div>
          <i className='fas fa-times close-icon' onClick={handleClose}></i>
          {GENRES.map(genre => (
            <div key={`genre-${genre}`} className='genre-modal-field'>
              <label className='label' htmlFor={genre}>
                {genre}
                <input
                  aria-label={genre}
                  className='checkbox'
                  type='checkbox'
                  name={genre}
                  onClick={() => handleSelectGenre(genre)}
                />
                <span className='checkmark'></span>
              </label>
            </div>
          ))}
        </SmallModal>
      </MultipleSelectionFormField>
      <TextareaFormField
        aria-label='overview'
        label='OVERVIEW'
        onChange={handleOnChange('overview')}
        placeholder='Overview'
        value={form.overview}
      />
      <FormField
        aria-label='runtime'
        label='RUNTIME'
        onChange={handleOnChange('runtime')}
        placeholder='Runtime'
        type='number'
        value={form.runtime}
      />
      <div className='form-actions-container'>
        <Button
          aria-label='reset'
          onClick={() => {
            onClose()
            setForm(INITIAL_STATE)
          }}
        >
          RESET
        </Button>
        <Button
          aria-label='submit'
          onClick={() => {
            onClose()
            console.log(form)
            setForm(INITIAL_STATE)
          }}
        >
          {content === FormContent.CREATE ? 'SUBMIT' : 'SAVE'}
        </Button>
      </div>
    </div>
  )
}
