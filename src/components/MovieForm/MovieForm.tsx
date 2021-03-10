import React, { DetailedHTMLProps, HTMLAttributes } from 'react'
import './MovieForm.scss'

export type MovieFormProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  title?: string
}

export const MovieForm = ({ children, title, ...rest }: MovieFormProps) => (
  <div className='app-movie-form-container' {...rest}>
    {title && <h5 className='app-movie-form-header'>{title}</h5>}
    {children}
  </div>
)
