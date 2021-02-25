import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import { InputBox } from '@app/components'
import './FormField.scss'

export type FormFieldProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label: string
}

export const FormField = ({ label, ...rest }: FormFieldProps) => (
  <div className='app-form-field'>
    <label className='app-form-field-label'>{label}</label>
    <InputBox {...rest} />
  </div>
)
