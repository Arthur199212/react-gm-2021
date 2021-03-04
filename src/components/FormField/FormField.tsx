import { FieldProps, getIn } from 'formik'
import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import { InputBox } from '@app/components'
import { replaceFirstWord } from '@app/utils'
import './FormField.scss'

export type FormFieldProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  FieldProps & {
    label: string
  }

export const FormField = ({ field, form, label, ...rest }: FormFieldProps) => {
  const errorText: string | undefined =
    getIn(form.touched, field.name) && getIn(form.errors, field.name)

  return (
    <div className='app-form-field'>
      <label className='app-form-field-label'>{label}</label>
      <InputBox error={Boolean(errorText)} {...field} {...rest} />
      <div className='error-text'>{replaceFirstWord(label, errorText)}</div>
    </div>
  )
}
