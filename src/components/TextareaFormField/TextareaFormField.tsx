import { FieldHookConfig, useField } from 'formik'
import React from 'react'
import { TextareaBox, TextareaBoxProps } from '@app/components'
import './TextareaFormField.scss'

type TextareaFormFieldProps = TextareaBoxProps &
  FieldHookConfig<{}> & {
    label: string
  }

export const TextareaFormField = ({ label, ...rest }: TextareaFormFieldProps) => {
  const [field, meta] = useField(rest)
  const errorText = meta.touched && meta.error

  return (
    <div className='app-textarea-form-field'>
      <label className='app-textarea-form-field-label'>{label}</label>
      <TextareaBox error={Boolean(errorText)} {...field} {...rest} />
      {errorText && <div className='error-text'>{errorText}</div>}
    </div>
  )
}
