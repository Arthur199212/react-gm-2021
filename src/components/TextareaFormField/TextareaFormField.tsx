import { FieldProps, getIn } from 'formik'
import React from 'react'
import { TextareaBox, TextareaBoxProps } from '@app/components'
import { replaceFirstWord } from '@app/utils'
import './TextareaFormField.scss'

type TextareaFormFieldProps = TextareaBoxProps &
  FieldProps & {
    label: string
  }

export const TextareaFormField = ({ field, form, label, ...rest }: TextareaFormFieldProps) => {
  const errorText: string | undefined =
    getIn(form.touched, field.name) && getIn(form.errors, field.name)

  return (
    <div className='app-textarea-form-field'>
      <label className='app-textarea-form-field-label'>{label}</label>
      <TextareaBox error={Boolean(errorText)} {...field} {...rest} />
      <div className='error-text'>{replaceFirstWord(label, errorText)}</div>
    </div>
  )
}
