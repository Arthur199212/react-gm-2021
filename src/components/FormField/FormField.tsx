import { FieldHookConfig, useField } from 'formik'
import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import { InputBox } from '@app/components'
import './FormField.scss'

export type FormFieldProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  FieldHookConfig<{}> & {
    label: string
    name: string
  }

export const FormField = ({ label, ...rest }: FormFieldProps) => {
  const [field, meta] = useField(rest)
  const errorText = meta.touched && meta.error

  return (
    <div className='app-form-field'>
      <label className='app-form-field-label'>{label}</label>
      <InputBox error={Boolean(errorText)} {...field} {...rest} />
      {errorText && <div className='error-text'>{errorText}</div>}
    </div>
  )
}
