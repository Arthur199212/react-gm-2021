import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import './GenreFormField.scss'

type GenreFormFieldProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  genre: string
}

export const GenreFormField = ({ genre, ...rest }: GenreFormFieldProps) => (
  <div key={`genre-${genre}`} className='genre-form-field'>
    <label className='label' htmlFor={genre}>
      {genre}
      <input aria-label={genre} className='checkbox' type='checkbox' name={genre} {...rest} />
      <span className='checkmark'></span>
    </label>
  </div>
)
