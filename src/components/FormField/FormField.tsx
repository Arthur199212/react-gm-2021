import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react'
import { InputBox } from '@app/components'
import './FormField.scss'

export type FormFieldProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  type?: string
  value?: string | number
}

export const FormField = ({ label, value = '', ...rest }: FormFieldProps) => (
  <div className='app-form-field'>
    <label className='app-form-field-label'>{label}</label>
    <InputBox value={value} {...rest} />
  </div>
)
