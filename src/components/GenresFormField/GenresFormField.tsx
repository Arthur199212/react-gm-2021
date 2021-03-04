import React, { useRef, useState } from 'react'
import {
  CloseIcon,
  FormField,
  FormFieldProps,
  CheckboxFormField,
  SmallModal
} from '@app/components'
import { useClickOutside } from '@app/hooks'
import { capitalizeStr, sortGenresAlphabetically } from '@app/utils'
import { GENRES } from './GenresFormField.constants'
import './GenresFormField.scss'

export const GenresFormField = (props: FormFieldProps) => {
  const { field, form } = props
  const [isOpen, setIsOpen] = useState(false)
  const smallModalRef = useRef(null)

  const handleSmallModalClose = () => setIsOpen(false)

  useClickOutside(smallModalRef, handleSmallModalClose, isOpen)

  const handleSelectGenre = (clickedGenre: string) => {
    const genreName = capitalizeStr(clickedGenre)

    if (field.value?.includes(genreName)) {
      form.setFieldValue(
        field.name,
        field.value.filter((i: string) => i !== genreName)
      )
      return
    }

    form.setFieldValue(field.name, [...field.value, genreName])
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
        value={sortGenresAlphabetically(field.value)}
        {...props}
      />
      <SmallModal elRef={smallModalRef} open={isOpen} scrollable>
        <div className='genres-form-field-modal-title'>CHOOSE GENRES</div>
        <CloseIcon onClick={handleSmallModalClose} topRight />
        {GENRES.map(genre => (
          <CheckboxFormField
            key={`genre-${genre}`}
            defaultChecked={field.value?.some((gnr: string) => gnr.toLocaleLowerCase() === genre)}
            label={genre}
            onClick={() => handleSelectGenre(genre)}
          />
        ))}
      </SmallModal>
    </>
  )
}
