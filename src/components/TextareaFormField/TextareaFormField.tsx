import React, { ChangeEvent } from 'react'
import { FormFieldProps, TextareaBox } from '@app/components'
import './TextareaFormField.scss'

type Override<T, R> = Omit<T, keyof R> & R

type TextareaFormFieldProps = Override<
  FormFieldProps,
  {
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
  }
>

export const TextareaFormField = ({ label, ...rest }: TextareaFormFieldProps) => {
  return (
    <div className='app-textarea-form-field'>
      <label className='app-textarea-form-field-label'>{label}</label>
      <TextareaBox {...rest} />
    </div>
  )
}
