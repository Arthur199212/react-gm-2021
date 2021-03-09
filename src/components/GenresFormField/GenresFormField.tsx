import { useField } from 'formik'
import React, { useRef, useState } from 'react'
import {
  CloseIcon,
  FormField,
  FormFieldProps,
  CheckboxFormField,
  SmallModal
} from '@app/components'
import { useClickOutside } from '@app/hooks'
import { sortGenresAlphabetically } from '@app/utils'
import { GENRES, GenresFormFieldTestIds } from './GenresFormField.constants'

export const GenresFormField = (props: FormFieldProps) => {
  const [, { value }, { setValue }] = useField<any>(props)
  const [isOpen, setIsOpen] = useState(false)
  const smallModalRef = useRef(null)

  const handleSmallModalClose = () => setIsOpen(false)

  useClickOutside(smallModalRef, handleSmallModalClose, isOpen)

  const handleSelectGenre = (genre: string) => {
    if (value.includes(genre)) {
      return setValue(value.filter((i: string) => i !== genre))
    }

    setValue([...value, genre])
  }

  return (
    <>
      <FormField
        onBlur={event => {
          event.preventDefault()
        }}
        onChange={event => {
          event.preventDefault()
        }}
        onClick={() => setIsOpen(true)}
        value={sortGenresAlphabetically(value)}
        {...props}
      />
      <SmallModal
        data-testid={GenresFormFieldTestIds.SMALL_MODAL}
        elRef={smallModalRef}
        open={isOpen}
        scrollable
      >
        <div className='genres-form-field-modal-title'>CHOOSE GENRES</div>
        <CloseIcon onClick={handleSmallModalClose} topRight />
        {GENRES.map(genre => (
          <CheckboxFormField
            key={`genre-${genre}`}
            checked={value.includes(genre)}
            label={genre}
            onChange={() => handleSelectGenre(genre)}
          />
        ))}
      </SmallModal>
    </>
  )
}
